import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { getUser } from '../../../../storage';
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
import Button from '../../../../components/common/Button';
import CustomTable from '../../../../components/common/Table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function AdminViewTopics() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['Topic Id', 'Topic', 'Category', 'Posts', 'Created At', 'Author', 'Actions'];

    const { data: topData, error: errorTopData, isFetching: isFetchingTopData } = useQuery('topics', () => {
        return http().get('/topics');
    });

    const { mutate: deleteTop, isError: isErrorDeleteTop, isLoading: isDeletingTop, isSuccess: isSuccessDeleteTop } = useMutation((id) => {
        return http().delete(`/topics/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('topics');
        }
    }
    );

    useEffect(() => {
        if (getUser()) {
            // Even if checking user role is done by the backend, we're still making sure that no non-admin users can stay in this page.
            if (getUser()?.roleId !== 1) {
                history.replace('/admin/login');
            }
        } else {
            history.replace('/admin/login');
        }
    }, []);

    useEffect(() => {
        if (errorTopData) {
            failureToast(errorTopData?.response?.data?.message || "Error");
        } if (topData) {
            setTableData(topData?.data.map(d => {
                return {
                    id: d?.id,
                    topic: d?.title,
                    category: d?.Category?.name,
                    posts: d?.Posts.length,
                    createdAt: d?.createdAt.slice(0, 10),
                    author: d?.User.name,
                }
            }))
        }
    }, [errorTopData, topData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Topics List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                            <Button type="button" onClick={() => history.push("/admin/topics/add")}>Add Topic</Button>
                        </div>
                        <div>
                            <CustomTable
                                tableName="Topic"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingTopData}
                                deleteFunc={deleteTop}
                                isDeleting={isDeletingTop}
                                isErrorDeleting={isErrorDeleteTop}
                                isSuccessDeleting={isSuccessDeleteTop}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewTopics;

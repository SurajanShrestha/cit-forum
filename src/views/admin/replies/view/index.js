import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { getUser } from '../../../../storage';
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
// import Button from '../../../../components/common/Button';
import CustomTable from '../../../../components/common/Table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function AdminViewReplies() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['Reply Id', 'Reply', 'Post', 'Topic', 'Created At', 'Author', 'Actions'];

    const { data: repData, error: errorRepData, isFetching: isFetchingRepData } = useQuery('repliesOrderedByPostTitle', () => {
        return http().get('/replies/orderedByPostTitle');
    });

    const { mutate: deleteRep, isError: isErrorDeleteRep, isLoading: isDeletingRep, isSuccess: isSuccessDeleteRep } = useMutation((id) => {
        return http().delete(`/replies/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('repliesOrderedByPostTitle');
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
        if (errorRepData) {
            failureToast(errorRepData?.response?.data?.message || "Error");
        } if (repData) {
            setTableData(repData?.data.map(d => {
                return {
                    id: d?.id,
                    reply: d?.content,
                    post: d?.Post.content,
                    topic: d?.Post.Topic.title,
                    createdAt: d?.createdAt.slice(0, 10),
                    author: d?.User.name,
                }
            }))
        }
    }, [errorRepData, repData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Replies List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                            {/* <Button type="button" onClick={() => history.push("/admin/categories/add")}>Add Topic</Button> */}
                        </div>
                        <div>
                            <CustomTable
                                tableName="Reply"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingRepData}
                                deleteFunc={deleteRep}
                                isDeleting={isDeletingRep}
                                isErrorDeleting={isErrorDeleteRep}
                                isSuccessDeleting={isSuccessDeleteRep}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewReplies;

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
// import Button from '../../../../components/common/Button';
import CustomTable from '../../../../components/common/Table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function AdminViewPosts() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['Post Id', 'Post', 'Topic', 'Replies', 'Created At', 'Author', 'Actions'];

    const { data: posData, error: errorPosData, isFetching: isFetchingPosData } = useQuery('postsOrderedByTopicTitle', () => {
        return http().get('/posts/orderedByTopicTitle');
    });

    const { mutate: deletePos, isError: isErrorDeletePos, isLoading: isDeletingPos, isSuccess: isSuccessDeletePos } = useMutation((id) => {
        return http().delete(`/posts/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('postsOrderedByTopicTitle');
        }
    }
    );

    useEffect(() => {
        if (errorPosData) {
            failureToast(errorPosData?.response?.data?.message || "Error");
        } if (posData) {
            setTableData(posData?.data.map(d => {
                return {
                    id: d?.id,
                    post: d?.content,
                    topic: d?.Topic.title,
                    replies: d?.Replies.length,
                    createdAt: d?.createdAt.slice(0, 10),
                    author: d?.User.name,
                }
            }))
        }
    }, [errorPosData, posData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Posts List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                            {/* <Button type="button" onClick={() => history.push("/admin/categories/add")}>Add Topic</Button> */}
                        </div>
                        <div>
                            <CustomTable
                                tableName="Post"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingPosData}
                                deleteFunc={deletePos}
                                isDeleting={isDeletingPos}
                                isErrorDeleting={isErrorDeletePos}
                                isSuccessDeleting={isSuccessDeletePos}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewPosts;

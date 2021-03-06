import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { getUser } from '../../../../storage';
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
import Button from '../../../../components/common/Button';
import CustomTable from '../../../../components/common/Table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function AdminViewUsers() {
    const history = useHistory();
    const queryClient = useQueryClient();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['User Id', 'Name', 'Role', 'Email', 'Age', 'Contact', 'Gender', 'Created At', 'Actions'];

    const { data: usersData, error: errorUsersData, isFetching: isFetchingUsersData } = useQuery('users', () => {
        return http().get('/users');
    });

    const { mutate: deleteUser, isError: isErrorDeleteUser, isLoading: isDeletingUser, isSuccess: isSuccessDeleteUser } = useMutation((id) => {
        return http().delete(`/users/${id}`);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
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
        if (errorUsersData) {
            failureToast(errorUsersData?.response?.data?.message || "Error");
        } if (usersData) {
            setTableData(usersData?.data.map(d => {
                return {
                    id: d?.id,
                    name: d?.name,
                    role: d?.RoleId === 1 ? 'Admin' : 'User',
                    email: d?.email,
                    age: d?.age,
                    contact: d?.contact,
                    gender: d?.gender,
                    createdAt: d?.createdAt.slice(0, 10),
                }
            }))
        }
    }, [errorUsersData, usersData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Users List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><FaLongArrowAltLeft /> Go Back</p>
                            <Button type="button" onClick={() => history.push("/admin/users/add")}>Add User</Button>
                        </div>
                        <div>
                            <CustomTable
                                tableName="User"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingUsersData}
                                deleteFunc={deleteUser}
                                isDeleting={isDeletingUser}
                                isErrorDeleting={isErrorDeleteUser}
                                isSuccessDeleting={isSuccessDeleteUser}
                                updateRoute={'/admin/users/update'}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewUsers;

import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';

function AdminViewUsers() {
    const [tableData, setTableData] = useState([]);

    const { data: usersData, error: errorUsersData, isFetching: isFetchingUsersData } = useQuery('users', () => {
        return http().get('/users');
    });

    useEffect(() => {
        if (errorUsersData) {
            failureToast(errorUsersData?.response?.data?.message || "Error");
        }
    }, [errorUsersData]);

    useEffect(() => {
        if (usersData) {
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
    }, [usersData]);

    const tableHeaders = ['UserId', 'Name', 'Role', 'Email', 'Age', 'Contact', 'Gender', 'Created At'];
    // const tableData = [{ name: 'hh', role: 'Admin', age: '18' }, { name: 'hh', role: 'Admin', age: '18' }];

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Users List" noPosts={true} />
                        {/* <Table headers={['Name', 'Role', 'Age']} data={[{name: 'hh', role: 'Admin', age: '18'}, {name: 'hh', role: 'Admin', age: '18'}]} /> */}
                        <div className="px-3">
                            <Table hover variant="dark" responsive>
                                <thead>
                                    <tr>
                                        {tableHeaders.map((h, i) => <th key={i}>{h}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {isFetchingUsersData ?
                                        <tr>
                                            <td colSpan={8} className="text-center"><Spinner animation="border" size="sm" /></td>
                                        </tr> :
                                        tableData ?
                                            tableData.map((td, i) => {
                                                return (
                                                    <tr>
                                                        {Object.keys(td).map((oKey, index) => <td className={oKey==='name' ? "greenText" : ""} key={index}>{td[oKey]}</td>)}
                                                    </tr>
                                                );
                                            }) :
                                            <td colSpan={8} className="text-center">
                                                <p className="f-sm">Error loading data.</p>
                                            </td>
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewUsers;

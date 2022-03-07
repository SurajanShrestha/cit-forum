import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { getUser } from "../../../../storage";
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
import CustomTable from '../../../../components/common/Table';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function AdminViewRoles() {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['Role Id', 'Type', 'Created At'];

    const { data: rolesData, error: errorRolesData, isFetching: isFetchingRolesData } = useQuery('roles', () => {
        return http().get('/roles');
    });

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
        if (errorRolesData) {
            failureToast(errorRolesData?.response?.data?.message || "Error");
        } if (rolesData) {
            setTableData(rolesData?.data.map(d => {
                return {
                    id: d?.id,
                    type: d?.type,
                    createdAt: d?.createdAt.slice(0, 10),
                }
            }))
        }
    }, [errorRolesData, rolesData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Roles List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.push("/admin")}><FaLongArrowAltLeft /> Go Back</p>
                        </div>
                        <div>
                            <CustomTable
                                tableName="Role"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingRolesData}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewRoles;

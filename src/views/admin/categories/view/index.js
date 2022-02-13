import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Layout from '../../../layout';
import { http } from "../../../../services/httpHelper";
import { failureToast } from "../../../../components/common/Toast";
import { HeaderBar } from '../../../../components';
import Button from '../../../../components/common/Button';
import CustomTable from '../../../../components/common/Table';

function AdminViewCategories() {
    const history = useHistory();
    const [tableData, setTableData] = useState([]);
    const tableHeaders = ['CategoryId', 'Name', 'Topics', 'Created At'];

    const { data: catData, error: errorCatData, isFetching: isFetchingCatData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    useEffect(() => {
        if (errorCatData) {
            failureToast(errorCatData?.response?.data?.message || "Error");
        } if (catData) {
            setTableData(catData?.data.map(d => {
                return {
                    id: d?.id,
                    name: d?.name,
                    topics: d?.Topics.length,
                    createdAt: d?.createdAt.slice(0, 10),
                }
            }))
        }
    }, [errorCatData, catData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 10, offset: '1' }}>
                        <HeaderBar title="Categories List" noPosts={true} />
                        <div className='d-flex justify-content-between mb-2'>
                            <p className="clickable f-sm greenText" onClick={() => history.goBack()}><i className='fa fa-long-arrow-left'></i> Go Back</p>
                            <Button type="button" onClick={() => history.push("/admin/categories/add")}>Add Category</Button>
                        </div>
                        <div>
                            <CustomTable
                                tableName="Category"
                                tableHeaders={tableHeaders}
                                tableData={tableData}
                                isFetchingTableData={isFetchingCatData}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default AdminViewCategories;

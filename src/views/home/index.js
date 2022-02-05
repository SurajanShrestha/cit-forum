import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Layout from '../layout';
import { http } from "../../services/httpHelper";
import { failureToast } from "../../components/common/Toast";
import { CategoryBoard } from '../../components';
import { HeaderBar } from '../../components';
import { List } from '../../components';
// import { BulletinBoard } from '../../components';
// import { Pagination } from '../../components';

function Home() {
    const { data: categoriesData, error: errorCategoriesData, isFetching: isFetchingCategoriesData, isSuccess: isSuccessCategoriesData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    const { data: topicsData, error: errorTopicsData, isFetching: isFetchingTopicsData, isSuccess: isSuccessTopicsData } = useQuery('topics', () => {
        return http().get('/topics');
    });

    useEffect(() => {
        if (errorCategoriesData) {
            failureToast(errorCategoriesData?.response?.data?.message || "Error");
        }
        if (errorTopicsData) {
            failureToast(errorTopicsData?.response?.data?.message || "Error");
        }
    }, [errorCategoriesData, errorTopicsData]);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={{ span: 3, order: '1' }} xs={{ span: 12, order: '2' }}>
                        {isSuccessCategoriesData ?
                            <CategoryBoard data={categoriesData?.data} /> :
                            <CategoryBoard data={null} />
                        }
                    </Col>
                    <Col lg={{ span: 9, order: '2' }} xs={{ span: 12, order: '1' }}>
                        <HeaderBar title="Latest Topics" categoryType="All Category" noPosts={true} />
                        {/* <List data={data} /> */}
                        {isSuccessTopicsData ?
                            <List data={topicsData.data} /> :
                            <List data={null} />
                        }
                        {/* <Pagination /> */}
                    </Col>
                    {/* <Col lg={{ span: 3, order: '3' }} xs={{ span: 12, order: '3' }}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col> */}
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;

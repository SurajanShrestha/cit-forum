import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Layout from '../layout';
import { http } from "../../services/httpHelper";
import { failureToast } from "../../components/common/Toast";
import { CategoryBoard } from '../../components';
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { BulletinBoard } from '../../components';
// import { Pagination } from '../../components';

function Home() {
    const { data: categoriesData, error: errorCategoriesData, isFetching: isFetchingCategoriesData, isSuccess: isSuccessCategoriesData } = useQuery('categories', () => {
        return http().get('/categories');
    });

    const { data: topicsData, error: errorTopicsData, isFetching: isFetchingTopicsData, isSuccess: isSuccessTopicsData } = useQuery('topics', () => {
        return http().get('/topics');
    });

    const { data: latestTopicsData, error: errorLatestTopicsData, isFetching: isFetchingLatestTopicsData, isSuccess: isSuccessLatestTopicsData } = useQuery('latestTopics', () => {
        return http().get('/topics/latest?limit=8');
    });

    useEffect(() => {
        if (errorCategoriesData) {
            failureToast(errorCategoriesData?.response?.data?.message || "Error");
        }
        if (errorTopicsData) {
            failureToast(errorTopicsData?.response?.data?.message || "Error");
        }
        if (errorLatestTopicsData) {
            failureToast(errorLatestTopicsData?.response?.data?.message || "Error");
        }
    }, [errorCategoriesData, errorTopicsData, errorLatestTopicsData]);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={{ span: 3, order: '1' }} xs={{ span: 12, order: '2' }}>
                        {isFetchingCategoriesData ?
                            <p className="f-sm grayText">Loading...</p> :
                            isSuccessCategoriesData ?
                                <CategoryBoard data={categoriesData?.data} /> :
                                <CategoryBoard data={null} />
                        }
                    </Col>
                    <Col lg={{ span: 6, order: '2' }} xs={{ span: 12, order: '1' }}>
                        <HeaderBar title="Latest Topics" categoryType="All Category" noPosts={true} />
                        {/* <List data={data} /> */}
                        {isFetchingTopicsData ?
                            <p className="f-sm grayText">Loading...</p> :
                            isSuccessTopicsData ?
                                <List data={topicsData.data} /> :
                                <List data={null} />
                        }
                        {/* <Pagination /> */}
                    </Col>
                    <Col lg={{ span: 3, order: '3' }} xs={{ span: 12, order: '3' }}>
                        {isFetchingLatestTopicsData ?
                            <p className="f-sm grayText">Loading...</p> :
                            isSuccessLatestTopicsData ?
                                <BulletinBoard heading="Latest Topics" data={latestTopicsData?.data} /> :
                                <BulletinBoard heading="Latest Topics" data={null} />
                        }
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;

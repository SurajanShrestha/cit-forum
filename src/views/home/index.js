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

    const data = [
        {
            topic: "Predict my MMR Mega-Thread! skdnksd skd sd",
            createdDate: "2 Days ago",
            posts: "140",
            author: "John Doe"
        },
        {
            topic: "Fees Discount must be given and it should be a significant amount",
            createdDate: "2020-07-12",
            posts: "800",
            author: "Hari Kumar Chaudhary"
        },
        {
            topic: "Canteen must be improved. There's cockroaches everywhere",
            createdDate: "2020-07-10",
            posts: "20",
            author: "Ram Karki"
        },
        {
            topic: "Courses must be renewed. And practicals must be held",
            createdDate: "2021-04-12",
            posts: "180",
            author: "Gaurav Bajracharya"
        },
        {
            topic: "When is PU going to announce the results? Are they that much lazy?",
            createdDate: "Yesterday",
            posts: "8",
            author: "Barun Karki"
        }
    ]
    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={{ span: 3, order: '1' }} xs={{ span: 12, order: '2' }}>
                        {isSuccessCategoriesData ?
                            <CategoryBoard data={categoriesData.data} /> :
                            <CategoryBoard data={null} />
                        }
                    </Col>
                    <Col lg={{ span: 9, order: '2' }} xs={{ span: 12, order: '1' }}>
                        <HeaderBar title="Latest Topics" categoryType="All Category" totalTopics="" totalPosts="" />
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

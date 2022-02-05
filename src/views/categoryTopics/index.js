import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { http } from '../../services/httpHelper';
import Layout from '../layout';
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { CategoryBoard } from '../../components';

function CategoryTopics() {
    const { slug } = useParams();

    const { data: allCatData, isFetching: isFetchingAllCatData } = useQuery('allCategories', () => {
        return http().get('/categories');
    });

    const { data: singleCatData, isFetching: isFetchingSingleCatData, } = useQuery(['singleCategory', { slug }], () => {
        return http().get(`/categories/${slug}`);
    });

    const { data: topicsData, isFetching: isFetchingTopicsData, } = useQuery(['topicsByCategory', { slug }], () => {
        return http().get(`/topics/byCategoryId?CategoryId=${slug}`)
    });

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        {isFetchingSingleCatData ?
                            <p className='f-sm'>Loading...</p> :
                            singleCatData?.data ?
                                <HeaderBar title={`Topics for: "${singleCatData?.data?.name}"`} categoryType={singleCatData?.data?.name} totalTopics={singleCatData?.data?.Topics.length} noPosts={true} /> :
                                null
                        }
                        {isFetchingTopicsData ?
                            <p className='f-sm'>Loading...</p> :
                            topicsData?.data.length ?
                                <List data={topicsData?.data} /> :
                                <p className='f-sm'>No topics for this category</p>
                        }
                    </Col>
                    <Col lg={4}>
                        {isFetchingAllCatData ?
                            <p className='f-sm'>Loading...</p> :
                            allCatData ?
                                <CategoryBoard data={allCatData?.data} /> :
                                null
                        }
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default CategoryTopics;

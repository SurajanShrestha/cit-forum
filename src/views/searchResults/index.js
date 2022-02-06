import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { http } from '../../services/httpHelper';
import Layout from '../layout';
import { useURLQuery } from '../../hooks/useURLQuery';
import { HeaderBar } from '../../components';
import { List } from '../../components';
// import { BulletinBoard } from '../../components';

function SearchResults() {
    const urlQuery = useURLQuery();
    const searchQuery = urlQuery.get("search");

    const { data: topicsData, isFetching: isFetchingTopicsData, } = useQuery(['searchTopics', { searchQuery }], () => {
        return http().get(`/topics/search?title=${searchQuery}`)
    });

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        <HeaderBar title={`Search Results for: "${searchQuery}"`} totalTopics={topicsData ? topicsData?.data.length : 0} />
                        {isFetchingTopicsData ?
                            <p className='f-sm'>Loading...</p> :
                            topicsData?.data.length ?
                                <List data={topicsData?.data} /> :
                                <p className='f-sm'>No topics for this category</p>
                        }
                    </Col>
                    {/* <Col lg={4}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col> */}
                </Row>
            </Container>
        </Layout>
    );
}

export default SearchResults;

import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../layout';
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { BulletinBoard } from '../../components';
import { Pagination } from '../../components';

function SearchResults() {
    const data=[
        {
            topic: "Predict my MMR Mega-Thread! skdnksd skd sd",
            createdDate: "2 Days ago",
            posts: "140",
            author: "Jon Snow"
        },
        {
            topic: "Fees Discount must be given and it should be a significant amount",
            createdDate: "2020-07-12",
            posts: "800",
            author: "Jon Snow"
        },
        {
            topic: "Canteen must be improved. There's cockroaches everywhere",
            createdDate: "2020-07-10",
            posts: "20",
            author: "Jon Snow"
        },
        {
            topic: "Courses must be renewed. And practicals must be held",
            createdDate: "2021-04-12",
            posts: "180",
            author: "Jon Snow"
        }
    ];
    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        <HeaderBar title="Search Results for 'Admission Fee Discount'" totalTopics={20} />
                        <List data={data} />
                        <Pagination />
                    </Col>
                    <Col lg={4}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default SearchResults;

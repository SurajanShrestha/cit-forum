import Layout from '../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { HeaderBar } from '../../components';
import { BulletinBoard } from '../../components';
import { DiscussionBoard } from '../../components';

function Topic() {
    const data=[
        {
            topic: "Predict my MMR Mega-Thread! skdnksd skd sd"
        },
        {
            topic: "Fees Discount must be given and it should be a significant amount"
        },
        {
            topic: "Canteen must be improved. There's cockroaches everywhere"
        },
        {
            topic: "Courses must be renewed. And practicals must be held"
        }
    ];
    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        <HeaderBar title="Should Colleges give more than 10% Discount on Admission Fees?" categoryType="Education" totalPosts="2" />
                        <DiscussionBoard />
                    </Col>
                    <Col lg={4}>
                        <BulletinBoard heading="Trending" data={data} />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Topic;

import Layout from '../layout';
import { Container, Row, Col } from 'react-bootstrap';
import { HeaderBar } from '../../components';
import { BulletinBoard } from '../../components';
import { DiscussionBoard } from '../../components';

function Topic() {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={8}>
                        <HeaderBar title="Should Colleges give more than 10% Discount on Admission Fees?" categoryType="Education" totalPosts="2" />
                        <DiscussionBoard />
                    </Col>
                    <Col lg={4}>
                        <BulletinBoard heading="Trending" />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Topic;

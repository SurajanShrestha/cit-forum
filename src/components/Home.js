import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from './Layout';
import CategoryBoard from './common/categoryBoard';
import HeaderBar from './common/HeaderBar';
import List from './common/List';
import BulletinBoard from './common/bulletinBoard';

function Home() {
    return (
        <Layout>
            <Container className="px-3">
                <Row>
                    <Col lg={3}>
                        <CategoryBoard/>
                    </Col>
                    <Col lg={6}>
                        <HeaderBar />
                        <List />
                    </Col>
                    <Col lg={3}>
                        <BulletinBoard heading="Trending" />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;

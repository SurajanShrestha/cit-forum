import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../layout';
import { CategoryBoard } from '../../components';
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { BulletinBoard } from '../../components';
import { Pagination } from '../../components';

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
                        <Pagination />
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

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
            <Container>
                <Row>
                    <Col lg={{ span: 3, order: '1' }} xs={{ span: 12, order: '2' }}>
                        <CategoryBoard/>
                    </Col>
                    <Col lg={{ span: 6, order: '2' }} xs={{ span: 12, order: '1' }}>
                        <HeaderBar title="Latest Topics" categoryType="All Category" totalForums="209087" totalPosts="406" />
                        <List />
                        <Pagination />
                    </Col>
                    <Col lg={{ span: 3, order: '3' }} xs={{ span: 12, order: '3' }}>
                        <BulletinBoard heading="Trending" />
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;

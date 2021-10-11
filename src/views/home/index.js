import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../layout';
import { CategoryBoard } from '../../components';
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { BulletinBoard } from '../../components';
import { Pagination } from '../../components';

function Home() {
    const data=[
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
                        <CategoryBoard/>
                    </Col>
                    <Col lg={{ span: 6, order: '2' }} xs={{ span: 12, order: '1' }}>
                        <HeaderBar title="Latest Topics" categoryType="All Category" totalForums="209087" totalPosts="406" />
                        <List data={data} />
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

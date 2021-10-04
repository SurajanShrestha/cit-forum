import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ListItem from './ListItem';

function List() {
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
            author: "Manish Pandey"
        }
    ]
    return (
        <Container>
            <Row className="mb-3">
                <Col className="f-md f-bold" xs={6}>Topic</Col>
                <Col className="f-md f-bold" xs={2}>Posts</Col>
                <Col className="f-md f-bold" xs={4}>Author</Col>
            </Row>
            {data.map((item, index)=>{
                return <ListItem topic={item.topic} createdDate={item.createdDate} posts={item.posts} author={item.author} key={index} index={++index} />
            })}
        </Container>
    );
}

export default List;

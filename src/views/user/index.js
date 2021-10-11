import { Container, Row, Col } from "react-bootstrap";
import Layout from "../layout";
import { HeaderBar } from '../../components';
import { List } from '../../components';
import { Pagination } from '../../components';

function User() {
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
                    <Col lg={{ span: 8, offset: 2 }}>
                        <HeaderBar userName="Jon Snow" userAvatar={ process.env.PUBLIC_URL+"/images/userAvatars/uAv-01.jpg" } avatarWidth={90} totalPosts="406" />
                        <List data={data} />
                        <Pagination />
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default User;

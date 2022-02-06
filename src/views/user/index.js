import { useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Layout from "../layout";
import { HeaderBar } from '../../components';
import { useQuery } from 'react-query';
import { http } from '../../services/httpHelper';
import { failureToast } from "../../components/common/Toast";
import { List } from '../../components';
// import { Pagination } from '../../components';

function User() {
    const { slug } = useParams();

    const { data: userData, error: errorUserData } = useQuery('user', () => {
        return http().get(`/users/${slug}`);
    });

    useEffect(() => {
        if (errorUserData) {
            failureToast(errorUserData?.response?.data?.message || "Error");
        }
    }, [errorUserData]);

    return (
        <Layout>
            <Container>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        {userData?.data ?
                            <>
                                <HeaderBar
                                    userName={userData?.data?.name}
                                    userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-02.jpg"}
                                    avatarWidth={90}
                                    // totalPosts={userData?.data?.Posts.length}
                                    totalTopics={userData?.data?.Topics.length}
                                />
                                <List data={userData?.data?.Topics} />
                            </> :
                            null
                        }
                        {/* <HeaderBar userName="Jon Snow" userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-01.jpg"} avatarWidth={90} totalPosts="406" /> */}
                        {/* <List /> */}
                        {/* <Pagination /> */}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default User;

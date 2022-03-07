import { useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from 'react-router-dom';
import Layout from "../../layout";
import { useQuery } from 'react-query';
import { http } from '../../../services/httpHelper';
import { failureToast } from "../../../components/common/Toast";
import { HeaderBar } from '../../../components';
import { List } from '../../../components';
import { getUser } from '../../../storage';

function AdminUserAccount() {
    const { slug } = useParams();
    const history = useHistory();

    const { data: myProfileData, error: errorMyProfileData } = useQuery('myProfile', () => {
        return http().get(`/users/${slug}`);
    });

    // useEffect(() => {
    //     if (!getUser()) {
    //         history.replace("/");
    //     }
    // }, []);

    useEffect(() => {
        if (getUser()) {
            // Even if checking user role is done by the backend, we're still making sure that no non-admin users can stay in this page.
            if (getUser()?.roleId !== 1) {
                history.replace('/admin/login');
            }
        } else {
            history.replace('/admin/login');
        }
    }, []);

    useEffect(() => {
        if (errorMyProfileData) {
            failureToast(errorMyProfileData?.response?.data?.message || "Error");
        }
    }, [errorMyProfileData]);

    return (
        <Layout forAdminPanel={true} noFooter={true}>
            <Container>
                <Row>
                    <Col lg={{ span: 8, offset: 2 }}>
                        {myProfileData?.data ?
                            <>
                                <HeaderBar
                                    userId={myProfileData?.data?.id}
                                    userName={myProfileData?.data?.name}
                                    userEmail={myProfileData?.data?.email}
                                    userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-02.jpg"}
                                    userRole={myProfileData?.data?.RoleId === 1 ? 'Admin' : 'User'}
                                    avatarWidth={90}
                                    editable={true}
                                    updateUser={true}
                                    updateUserRoute={`/admin/userAccount/update/${myProfileData?.data?.id}`}
                                    totalPosts={myProfileData?.data?.Posts.length}
                                />
                                <List data={myProfileData?.data?.Topics} deletable={true} editable={true} />
                            </> :
                            null
                        }
                        {/* <HeaderBar userName="Jon Snow" userEmail="jon.snow@got.com" userAvatar={process.env.PUBLIC_URL + "/images/userAvatars/uAv-02.jpg"} avatarWidth={90} editable={true} totalPosts="16" /> */}
                        {/* <List data={data} deletable={true} /> */}
                        {/* <Pagination /> */}
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default AdminUserAccount;

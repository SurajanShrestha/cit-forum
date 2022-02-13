import { useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
// import { useQuery } from 'react-query';
import Layout from '../layout';
import { getUser } from "../../storage";
// import { http } from "../../services/httpHelper";
// import { failureToast } from "../../components/common/Toast";
// import { CategoryBoard } from '../../components';
// import { HeaderBar } from '../../components';
// import { List } from '../../components';
// import { BulletinBoard } from '../../components';

function AdminPanel() {
    const history = useHistory();

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

    return (
        <>
            {getUser() ?
                getUser()?.roleId !== 1 ?
                    <p>Please login as admin. Redirecting...</p> :
                    <Layout forAdminPanel={true} noFooter={true}>
                        <Container>
                            <Row>
                                <Col lg={{ span: 10, offset: 1 }}>
                                    <Row>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-users" aria-hidden="true"></i>
                                                    <p className="font-md">Users</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/users/add">Add User</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/users/view">View all Users</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-user-secret" aria-hidden="true"></i>
                                                    <p className="font-md dash-title">Roles</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/roles/view">View all Roles</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-sitemap" aria-hidden="true"></i>
                                                    <p className="font-md dash-title">Categories</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/users/add">Add Category</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/users/add">View all Categories</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-book" aria-hidden="true"></i>
                                                    <p className="font-md dash-title">Topics</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/users/add">View all Topics</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-pencil-square" aria-hidden="true"></i>
                                                    <p className="font-md dash-title">Posts</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/users/add">View all Posts</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <i class="fa fa-comments" aria-hidden="true"></i>
                                                    <p className="font-md dash-title">Replies</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/users/add">View all Replies</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Layout> :
                <p>Please login as admin. Redirecting...</p>
            }
        </>
    );
}

export default AdminPanel;

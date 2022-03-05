import { useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../layout';
import { getUser } from "../../storage";
import { FaBook, FaComments, FaSitemap, FaUsers, FaUserSecret } from 'react-icons/fa';
import { MdTextSnippet } from 'react-icons/md'

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
                                                    <FaUsers className="icon" />
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
                                                    <FaUserSecret className="icon" />
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
                                                    <FaSitemap className="icon" />
                                                    <p className="font-md dash-title">Categories</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/categories/add">Add Category</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/categories/view">View all Categories</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <FaBook className="icon" />
                                                    <p className="font-md dash-title">Topics</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/topics/add">Add Topic</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/topics/view">View all Topics</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <MdTextSnippet className='icon' />
                                                    <p className="font-md dash-title">Posts</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/posts/add">Add Post</Link>
                                                        </li>
                                                        <li>
                                                            <Link to="/admin/posts/view">View all Posts</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={{ span: 4 }} xs={{ span: 6 }} className="d-flex justify-content-center">
                                            <div className="dashboard-box">
                                                <div className="heading">
                                                    <FaComments className="icon" />
                                                    <p className="font-md dash-title">Replies</p>
                                                </div>
                                                <div className="menu">
                                                    <ul>
                                                        <li>
                                                            <Link to="/admin/replies/view">View all Replies</Link>
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

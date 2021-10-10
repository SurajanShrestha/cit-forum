import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../layout";

function Login() {
    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Login</p>
                        <form>
                            <div className="field-container">
                                <label for="emailField">Email</label>
                                <input type="email" id="emailField" name="email" placeholder="Enter User Email" />        
                            </div>
                            <div className="field-container">
                                <label for="passwordField">Password</label>
                                <input type="password" id="passwordField" name="password" placeholder="Enter User Password" />            
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="custom-primary-outline-btn">Login</button>
                            </div>
                            <p className="note">Don't have an account? <Link to="/register">Create an Account</Link></p>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Login;

import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../layout";

function Register() {
    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Create an Account</p>
                        <form>
                            <div className="field-container">
                                <label for="fullNameField">Full Name</label>
                                <input type="text" id="fullNameField" name="fullname" placeholder="Enter User Full Name" />        
                            </div>
                            <div className="field-container">
                                <label for="emailField">Email</label>
                                <input type="email" id="emailField" name="email" placeholder="Enter User Email" />        
                            </div>
                            <div className="field-container">
                                <label for="passwordField">Password</label>
                                <input type="password" id="passwordField" name="password" placeholder="Enter User Password" />            
                            </div>
                            <div className="field-container">
                                <label for="passwordField">Re-enter Password</label>
                                <input type="password" id="passwordField" name="password" placeholder="Enter User Password" />            
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="custom-primary-outline-btn">Register</button>
                            </div>
                            <p className="note">Already have an account? <Link to="/login">Log In</Link></p>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Register;

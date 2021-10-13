import { Container, Row, Col } from "react-bootstrap";
import Layout from "../layout";

function CreateTopic() {
    return (
        <Layout>
            <Container>
                <Row className="px-3">
                    <Col lg={{ span: 6, offset: 3 }} className="single-form">
                        <p className="form-heading">Start a Topic for Discussion</p>
                        <form>
                            <div className="field-container">
                                <label for="topicTitleField">Title</label>
                                <input type="text" id="topicTitleField" name="topicTitle" placeholder="Enter Topic Title" required />
                            </div>
                            <div className="field-container">
                                <label for="categorySelectField">Category</label>
                                <select id="categorySelectField" name="category" required>
                                    <option value="">Select a Category</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Education & Study">Education & Study</option>
                                    <option value="IT & Telecommunication">IT & Telecommunication</option>
                                    <option value="Video Games">Video Games</option>
                                    <option value="Category 5">Category 5</option>
                                    <option value="Category 6">Category 6</option>
                                    <option value="Category 7">Category 7</option>
                                </select>
                            </div>
                            <div className="field-container">
                                <label for="firstPostField">Write the first post</label>
                                <textarea id="firstPostField" name="firstPost" placeholder="Start Writing..." rows="5" required></textarea>
                                <p className="note pt-1">This will be the first post that starts the discussion. Elaborate on your views.</p>
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="custom-primary-outline-btn">Start Discussion</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default CreateTopic;

import { Container, Row, Col } from 'react-bootstrap';

function HeaderBar() {
    return (
        <Container className="headerBar lightGrayBg">
            <Row>
                <Col xs={6}>
                    <p className="f-giant">Forums</p>
                    <small className="grayText">All Categories</small>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        <p>23,000</p>
                        <small className="grayText">Forums</small>
                    </div>
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        <p>982,890</p>
                        <small className="grayText">Posts</small>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderBar;

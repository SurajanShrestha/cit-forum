import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/header.module.css';
import utils from '../styles/utils/utils.module.css';

function HeaderBar() {
    return (
        <Container className={`${styles.headerBar} ${utils.grayBg}`}>
            <Row>
                <Col xs={6}>
                    <p className={utils.f24}>Forums</p>
                    <small className={utils.grayText}>All Categories</small>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        <p>23,000</p>
                        <small className={utils.grayText}>Forums</small>
                    </div>
                    <div className="ms-3 d-flex flex-column justify-content-center">
                        <p>982,890</p>
                        <small className={utils.grayText}>Posts</small>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default HeaderBar;

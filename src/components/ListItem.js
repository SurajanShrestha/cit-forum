import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import utils from '../styles/utils/utils.module.css';
import uAv1 from '../images/userAvatars/uAv-01.jpg';

function ListItem({ topic, createdDate, posts, author, index }) {
    return (
        /*Changing the background color of each ListItem based on if the ListItem's index is even or not*/
        <Row className={ (index%2===0) ? `py-1 mb-2` : `${utils.lightGrayBg} py-1 mb-2` }>
            <Col xs={6}>
                <Link to="/topic" className={`${utils.greenText} ${utils.f12}`}>{topic}</Link>
                <div>
                    <i className={`${utils.f12} ${utils.grayText} fa fa-calendar-check-o`} aria-hidden="true"></i>
                    <small className={`${utils.f11} ${utils.grayText}`}>&emsp;{createdDate}</small>
                </div>
            </Col>
            <Col className={`${utils.f12} d-flex align-items-start`} xs={2}>{posts}</Col>
            <Col className="d-flex align-items-start" xs={4}>
                <Link to="/user"><img src={uAv1} alt="User Avatar" width={30} /></Link>
                <Link to="/user" className={`${utils.greenText} ${utils.f12} ms-2`}>{author}</Link>
            </Col>
        </Row>
    );
}

export default ListItem;

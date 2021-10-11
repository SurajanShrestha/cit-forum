import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
//import utils from '../styles/utils/utils.module.css';
//import uAv1 from '../../../../public/images/userAvatars/uAv-01.jpg';

function ListItem({ topic, createdDate, posts, author, index, deletable }) {
    return (
        <div className="px-3">
            {/*Changing the background color of each ListItem based on if the ListItem's index is even or not*/}
            <Row className={ (index%2===0) ? `py-1 mb-2` : `lightGrayBg py-1 mb-2` }>
                <Col xs={6}>
                    <Link to="/topic" className="greenText f-sm">{topic}</Link>
                    <div className="d-flex align-items-center">
                        <i className="f-sm grayText fa fa-calendar-check-o" aria-hidden="true"></i>
                        <small className="f-xs grayText">&emsp;{createdDate}</small>
                        { deletable ? <i className="f-md grayText fa fa-trash-o ms-2 clickable" aria-hidden="true" title="Delete Topic"></i> : null }
                    </div>
                </Col>
                <Col className="f-sm d-flex align-items-start" xs={2}>{posts}</Col>
                <Col className="d-flex align-items-start" xs={4}>
                    <Link to="/user"><img src={process.env.PUBLIC_URL+"/images/userAvatars/uAv-01.jpg"} alt="User Avatar" width={30} /></Link>
                    <Link to="/user" className="greenText f-sm ms-2">{author}</Link>
                </Col>
            </Row>
        </div>
    );
}

export default ListItem;

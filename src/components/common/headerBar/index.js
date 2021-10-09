import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderBar({ title, categoryType, totalForums, totalPosts }) {
    return (
        <Row className="headerBar lightGrayBg">
            <Col xs={ !totalForums && !totalPosts ? 12 : 9 }>
                { title ? <p className="f-xl">{title}</p> : null }
                { categoryType ? <Link to="/"><small className="greenText">{categoryType}</small></Link> : null }
            </Col>
            <Col xs={3} className="d-flex justify-content-end">
                <div className="ms-3 d-flex flex-column justify-content-center">
                    {
                        totalForums ?
                        <>
                            <p>{totalForums}</p>
                            <small className="grayText">Forums</small>
                        </> :
                        null
                    }
                </div>
                <div className="ms-3 d-flex flex-column justify-content-center">
                    {
                        totalPosts ?
                        <>
                            <p>{totalPosts}</p>
                            <small className="grayText">Posts</small>
                        </> :
                        null
                    }
                </div>
            </Col>
        </Row>
    );
}

export default HeaderBar;

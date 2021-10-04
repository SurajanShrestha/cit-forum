import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Navbar(){
    const [openSearch, setOpenSearch]=useState(false);

    return (
        <div className="custom-navbar">
            <Container>
                <Row>
                    <Col xs={3}>
                        <p>Title</p>
                    </Col>
                    <Col xs={9} className="text-end">
                        <a href="#" className="f-md mx-2 greenText" onClick={()=>setOpenSearch(!openSearch)}><i class="fa fa-search" aria-hidden="true"></i></a>
                        <Link to="/" className="f-sm mx-2">Log In/Sign Up</Link>
                        <Link to="/" className="custom-primary-outline-btn mx-2">Start a Topic</Link>
                    </Col>
                    <div className={ openSearch ? "search-popup p-3 d-flex justify-content-center" : "search-popup-disabled" }>
                        <form className="d-flex">
                            <input type="text" className="search-input" placeholder="Search Topics..." />
                            <button className="custom-primary-outline-btn">Search</button>
                        </form>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Navbar;
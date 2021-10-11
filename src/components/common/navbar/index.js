import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

function Navbar(){
    const [openSearch, setOpenSearch]=useState(false);

    return (
        <header className="custom-navbar">
            <Container>
                <Row>
                    <Col xs={2}>
                        <Link to="/"><p>Cit Forums</p></Link>
                    </Col>
                    <Col xs={10} className="text-end">
                        <span href="#" className="f-md mx-2 greenText clickable" onClick={()=>setOpenSearch(!openSearch)}><i class="fa fa-search" aria-hidden="true"></i></span>
                        <Link to="/login" className="f-sm mx-2">Log In</Link>
                        <Link to="/" className="custom-primary-outline-btn mx-2">Start a Topic</Link>
                    </Col>
                    <div className={ openSearch ? "search-popup p-3 d-flex flex-column justify-content-center align-items-center" : "search-popup-disabled" }>
                        <small className="grayText pb-2">Search Desired Topics</small>
                        <form className="d-flex">
                            <input type="text" className="search-input" placeholder="Search Topics..." />
                            <button className="custom-primary-outline-btn">Search</button>
                        </form>
                    </div>
                </Row>
            </Container>
        </header>
    );
}

export default Navbar;
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { getUser, removeUser } from '../../../storage';

function Navbar({ forAdminPanel = false }) {
    const history = useHistory();
    const [openSearch, setOpenSearch] = useState(false);
    const [userData, setUserData] = useState({});
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (getUser()) {
            setUserData(getUser());
        } else {
            setUserData({});
        }
    }, []);

    const handleLogout = () => {
        removeUser();
        history.go(0);
    };

    return (
        <header className="custom-navbar">
            <Container>
                <Row>
                    <Col xs={2}>
                        <Link to="/"><p>{forAdminPanel ? 'CITE Admin' : 'CITE Forums'}</p></Link>
                    </Col>
                    <Col xs={10} className="text-end">
                        <span href="#" className="f-md mx-2 greenText clickable" onClick={() => setOpenSearch(!openSearch)}><i class="fa fa-search" aria-hidden="true"></i></span>
                        {Object.keys(userData).length ?
                            <>
                                <Link to={`/userAccount/${userData.id}`} className="f-sm mx-2">Welcome, {userData.name}</Link>
                                <Link to="#" className="f-sm mx-2" onClick={handleLogout}>Log Out</Link>
                                {forAdminPanel ?
                                    null :
                                    <Link to="/createTopic" className="custom-primary-outline-btn mx-2">Start a Topic</Link>
                                }
                            </> :
                            forAdminPanel ?
                                null :
                                <Link to="/login" className="f-sm mx-2">Log In</Link>
                        }
                    </Col>
                    <div className={openSearch ? "search-popup p-3 d-flex flex-column justify-content-center align-items-center" : "search-popup-disabled"}>
                        <small className="grayText pb-2">Search Desired Topics</small>
                        <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" className="search-input" placeholder="Search Topics..." onChange={(e) => setSearchQuery(e.target.value)} />
                            <Link to={`/searchResults?search=${searchQuery}`} className="custom-primary-outline-btn">Search</Link>
                            <button type="button" className="ms-1 custom-secondary-outline-btn" onClick={() => setOpenSearch(false)}>Cancel</button>
                        </form>
                    </div>
                </Row>
            </Container>
        </header>
    );
}

export default Navbar;
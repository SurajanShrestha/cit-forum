import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function index() {
    return (
        <div className="pagination">
            <Link to="/" className="action-btn"><FaAngleLeft /></Link>
            <ul className="page-list">
                <span className="page-label">Page: </span>
                <Link to="/">
                    <li className="page-number active">1</li>
                </Link>
                <Link to="/">
                    <li className="page-number">2</li>
                </Link>
                <Link to="/">
                    <li className="page-number">3</li>
                </Link>
                <span>. . .</span>
                <Link to="/">
                    <li className="page-number">10</li>
                </Link>
            </ul>
            <Link to="/" className="action-btn"><FaAngleRight /></Link>
        </div>
    );
}

export default index;

import { Link } from "react-router-dom";
function BulletinBoard({ heading }){
    return (
        <div class="bulletin-board">
            <p className="heading">{heading}</p>
            <ul className="list-wrapper">
                <Link to="/topic">
                    <li className="list">Courses must be renewed. And practicals must be held.</li>
                </Link>
                <Link to="/topic">
                    <li className="list">When is PU going to announce the results? Are they that much lazy?</li>
                </Link>
                <Link to="/topic">
                    <li className="list">Fees Discount must be given and it should be a significant amount</li>
                </Link>
                <Link to="/topic">
                    <li className="list">Predict my MMR Mega-Thread! skdnksd skd sd</li>
                </Link>
            </ul>
            <div className="text-center">
                <button className="custom-primary-outline-btn">Load More</button>
            </div>
        </div>
    );
}

export default BulletinBoard;
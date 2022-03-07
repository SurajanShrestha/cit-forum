import { Link } from "react-router-dom";

function CategoryBoard({ data }) {
    return (
        <div class="cat-board">
            <p className="heading">Browse Categories</p>
            <ul className="list-wrapper">
                <Link to="#">
                    <li className="list active">All Categories</li>
                </Link>
                {data ?
                    data.map((cat, index) => {
                        return (
                            <Link to={`/categoryTopics/${cat?.id}`} key={index}>
                                <li className="list">{cat?.name}</li>
                            </Link>
                        )
                    }) :
                    null
                }
                {/* // <Link to="/topic">
                //     <li className="list">Politics</li>
                // </Link>
                // <Link to="/topic">
                //     <li className="list">Education & Study</li>
                // </Link>
                // <Link to="/topic">
                //     <li className="list">IT & Telecommunication</li>
                // </Link>
                // <Link to="/topic">
                //     <li className="list">Video Games</li>
                // </Link> */}
            </ul>
            {/* <div className="text-center">
                <button className="custom-primary-outline-btn">Load More</button>
            </div> */}
        </div>
    );
}

export default CategoryBoard;
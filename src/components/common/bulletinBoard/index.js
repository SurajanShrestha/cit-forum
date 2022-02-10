import { Link } from "react-router-dom";

function BulletinBoard({ heading, data }) {
    return (
        <div class="bulletin-board">
            <p className="heading">{heading}</p>
            <ul className="list-wrapper">
                {data ?
                    data.map((item, index) => {
                        return (
                            <Link to={`/topic/${item?.id}`} key={index}>
                                <li className="list">{item?.title}</li>
                            </Link>
                        );
                    }) :
                    null
                }
            </ul>
            {/* <div className="text-center">
                <button className="custom-primary-outline-btn">Load More</button>
            </div> */}
        </div>
    );
}

export default BulletinBoard;
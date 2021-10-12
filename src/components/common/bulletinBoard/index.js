import { Link } from "react-router-dom";

function BulletinBoard({ heading, data }){
    return (
        <div class="bulletin-board">
            <p className="heading">{heading}</p>
            <ul className="list-wrapper">
                {
                    data.map((item)=>{
                        return(
                            <Link to="/topic">
                                <li className="list">{item.topic}</li>
                            </Link>
                        );
                    })
                }
            </ul>
            <div className="text-center">
                <button className="custom-primary-outline-btn">Load More</button>
            </div>
        </div>
    );
}

export default BulletinBoard;
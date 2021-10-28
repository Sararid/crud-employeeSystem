import { Link } from "react-router-dom";
import video from "../video/video.mp4"
const Header = () => {
    return (
        <header className="header">
            <h1 className="header__title"> HR MANAGEMENT SYSTEM</h1>
            <div className="header__section">
                <div className="header__section--desc">
                    <h2 className="title">All in one HR database</h2>
                    <p className="par">
                        Keep track of your employees with this easy employee registration
                        system.
                    </p>
                </div>
                <div>
                    <video width="500" height="250" controls>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>
            <Link to="/employee-database" className="header__section--btn">
                <button className="btn">Get started</button>
            </Link>
        </header>
    );
};

export default Header;

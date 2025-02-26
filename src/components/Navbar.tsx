import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>  <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>  <Link to="/admin">Admin</Link></h2>
        </nav>
    );
};

export default Navbar;

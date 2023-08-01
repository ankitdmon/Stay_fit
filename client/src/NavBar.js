import "./NavBar.css";
import { Nav, Navbar } from "react-bootstrap";
import UserContext from "./UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

function NavBar({ logout }) {

    const { currentUser } = useContext(UserContext);
    function loggedInNav() {
        return (
            <div className="row">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/meals">Meals</NavLink>
                        <NavLink to="/bmr">BMR</NavLink>
                        <NavLink to="/foodJournal">Food Journal</NavLink>
                        <NavLink exact to="/" onClick={logout}>
                            Logout {currentUser.first_name || currentUser.username}
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </div>
        );
    }
    function logoutNav() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark">
                <NavLink to="/bmr">BMR</NavLink>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">SignUp</Nav.Link>
            </Navbar >
        )
    }
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                MyFitness
            </Navbar.Brand>
            {currentUser ? loggedInNav() : logoutNav()}
        </Navbar>

    )
}
export default NavBar;
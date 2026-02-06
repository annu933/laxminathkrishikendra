import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">Laxminath Krishi Kendra</div>

            <ul className="nav-links">
                <li>
                    <NavLink to="/product" className="nav-link">
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inventory" className="nav-link">
                        Inventory
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/sales" className="nav-link">
                        Sales
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/purchase" className="nav-link">
                        Purchases
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/contact" className="nav-link">
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;

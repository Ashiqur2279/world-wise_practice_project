import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import styles from "./Header.module.css";
import Logo from "./Logo";

const Header = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/pricing"}>Pricing </NavLink>
        </li>
        <li>
          <NavLink to={"/login"}>
            <Button type="primary">Login</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;

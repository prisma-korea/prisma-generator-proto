import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to='/'>Example App</Link>
    </div>
  );
};

export default Header;

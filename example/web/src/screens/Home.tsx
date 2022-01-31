import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/HomeScreen.module.css";

const Home = () => {
  return (
    <div className={styles.screen}>
      <div className={styles.menu}>
        <h1>All Models</h1>
        <div className={styles.redirects}>
          <Link to='/country'>Country</Link>
          <Link to='/continent'>Continent</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

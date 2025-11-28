import React from "react";
import styles from "../../styles/AppSection.module.css";

const WelcomeTitle = () => {
    return (
        <div className={styles.titleContainer}>
            <h1 className={styles.welcomeTitle}>Bem Vindo!</h1>
        </div>
    );
};

export default WelcomeTitle;
import React from "react";
import styles from "../../styles/BannerFluxity.module.css";
import BannerImg from "../../images/BannerFluxity.png";

const BannerFluxity = () => {
    return (
        <div className={styles.bannerContainer}>
            <img src={BannerImg} alt="Fluxity Banner" className={styles.bannerImage} />
        </div>
    );
};

export default BannerFluxity;
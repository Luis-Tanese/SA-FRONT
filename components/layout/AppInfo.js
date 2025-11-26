import React from "react";
import styles from "../../styles/AppSection.module.css";
import CelularesImg from "../../images/celularesFluxity.png";

const AppInfo = () => {
    return (
        <section className={styles.infoContainer}>
            <img src={CelularesImg} alt="Celulares Fluxity" className={styles.phoneImage} />

            <div className={styles.textWrapper}>
                <h2 className={styles.sectionTitle}>O que é o aplicativo Fluxity App?</h2>
                <p className={styles.textBody}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac urna maximus, hendrerit nunc
                    vitae, accumsan massa. Cras facilisis, velit id vehicula malesuada, elit risus tempor magna, quis
                    rhoncus dolor quam ut diam. Phasellus non libero pulvinar, ultrices quam et, varius diam. Nunc
                    ullamcorper nisl sapien. Curabitur mollis.
                </p>
            </div>
        </section>
    );
};

export default AppInfo;
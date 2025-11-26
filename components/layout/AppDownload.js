import React from "react";
import styles from "../../styles/AppSection.module.css";

const AppDownload = () => {
    return (
        <section className={styles.downloadContainer}>
            <div className={styles.darkTextWrapper}>
                <h2 className={styles.whiteTitle}>Como Funciona o aplicativo?</h2>
                <p className={styles.whiteText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac urna maximus, hendrerit nunc
                    vitae, accumsan massa. Cras facilisis, velit id vehicula malesuada, elit risus tempor magna, quis
                    rhoncus dolor quam ut diam. Phasellus non libero pulvinar, ultrices quam et, varius diam. Nunc
                    ullamcorper nisl sapien. Curabitur mollis, tortor congue blandit porttitor, odio justo eleifend
                    ante, quis fermentum dolor ligula at erat. Donec ultrices risus ut sem molestie, ut sollicitudin
                    metus interdum.
                </p>
            </div>

            <div className={styles.ctaWrapper}>
                <span className={styles.ctaLabel}>Instale o aplicativo aqui:</span>
                <button className={styles.downloadButton}>Baixar App</button>
            </div>
        </section>
    );
};

export default AppDownload;
import React from "react";
import styles from "../../styles/TextoSobre.module.css";
import PCEImg from "../../images/PCEimg.png";

const TextoSobreUm = () => {
    return (
        <section className={styles.container}>
            <div className={styles.lineWrapper}>
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
            </div>

            <div className={styles.contentWrapper}>
                <h2 className={styles.title}>Sobre a empresa</h2>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac urna maximus, hendrerit nunc
                    vitae, accumsan massa. Cras facilisis, velit id vehicula malesuada, elit risus tempor magna, quis
                    rhoncus dolor quam ut diam. Phasellus non libero pulvinar, ultrices quam et, varius diam. Nunc
                    ullamcorper nisl sapien. Curabitur mollis, tortor congue blandit porttitor, odio justo eleifend
                    ante, quis fermentum dolor ligula at erat. Donec ultrices risus ut sem molestie, ut sollicitudin
                    metus interdum.
                </p>
            </div>

            <img src={PCEImg} alt="Sobre a empresa" className={styles.image} />
        </section>
    );
};

export default TextoSobreUm;
import React from "react";
import styles from "../../styles/TextoSobre.module.css";
import ArduinoImg from "../../images/Arduino.png";

const TextoSobreDois = () => {
    return (
        <section className={styles.container}>
            <img src={ArduinoImg} alt="Sobre o Produto" className={styles.image} />

            <div className={styles.contentWrapper}>
                <h2 className={styles.title} style={{ textAlign: "right" }}>
                    Sobre o Produto
                </h2>
                <p className={styles.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac urna maximus, hendrerit nunc
                    vitae, accumsan massa. Cras facilisis, velit id vehicula malesuada, elit risus tempor magna, quis
                    rhoncus dolor quam ut diam. Phasellus non libero pulvinar, ultrices quam et, varius diam. Nunc
                    ullamcorper nisl sapien. Curabitur mollis, tortor congue blandit porttitor, odio justo eleifend
                    ante, quis fermentum dolor ligula at erat. Donec ultrices risus ut sem molestie, ut sollicitudin
                    metus interdum.
                </p>

                <div className={styles.buttonGroup}>
                    <button className={styles.btn}>Comprar</button>
                    <button className={styles.btn}>App</button>
                </div>
            </div>

            <div className={styles.lineWrapper}>
                <div className={styles.dot}></div>
                <div className={styles.line}></div>
            </div>
        </section>
    );
};

export default TextoSobreDois;
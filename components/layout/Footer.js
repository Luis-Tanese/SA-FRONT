/* src/components/layout/Footer.js */
import React from "react";
import { Link } from "react-router-dom";
import { IconBrandInstagram, IconBrandGithub } from "@tabler/icons-react";
import styles from "../../styles/Footer.module.css";
import LogoBranca from "../../images/LogoBranca.png";

const Footer = () => {
    return (
        <footer className={styles.footerContainer}>
            <div className={styles.mainContent}>
                <img src={LogoBranca} alt="Fluxity Logo White" className={styles.logo} />

                <div className={styles.menuLinks}>
                    <Link to="/empresa" className={styles.link}>Empresa</Link>
                    <Link to="/produto" className={styles.link}>Produto</Link>
                    <Link to="/compras" className={styles.link}>Compras</Link>
                    <Link to="/dashboard" className={styles.link}>Dashboard</Link>
                </div>

                <div className={styles.socials}>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <IconBrandInstagram size={40} stroke={1.5} className={styles.socialIcon} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <IconBrandGithub size={40} stroke={1.5} className={styles.socialIcon} />
                    </a>
                </div>
            </div>

            <div className={styles.bottomArea}>
                <div className={styles.divider}></div>
                <div className={styles.copyright}>
                    Copyright © 2025 Fluxity. Todos os direitos reservados
                </div>
            </div>
        </footer>
    );
};

export default Footer;
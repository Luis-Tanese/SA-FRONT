import React from "react";
import { Link } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";
import styles from "../../styles/Navbar.module.css";
import LogoFluxity from "../../images/LogoFluxity.png";

const Navbar = () => {
    return (
        <nav className={styles.navbarContainer}>
            <Link to="/">
                <img src={LogoFluxity} alt="Fluxity Logo" className={styles.logo} />
            </Link>

            <div className={styles.navLinks}>
                <Link to="/empresa" className={styles.link}>Empresa</Link>
                <Link to="/produto" className={styles.link}>Produto</Link>
                <Link to="/compra" className={styles.link}>Compra</Link>
                <Link to="/pce" className={styles.link}>P.C.E's</Link>
                <Link to="/profile" className={styles.profileContainer}>
                    <IconUser className={styles.profileIcon} stroke={2} />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/NavbarVoltar.module.css";
import LogoFluxity from "../../images/LogoFluxity.png";

const NavbarVoltar = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <img 
                src={LogoFluxity} 
                alt="Logo Fluxity" 
                className={styles.logo} 
                onClick={() => navigate("/")} 
            />
            <span className={styles.link} onClick={() => navigate("/")}>
                Voltar
            </span>
        </div>
    );
};

export default NavbarVoltar;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconUser } from "@tabler/icons-react";
import styles from "../../styles/Navbar.module.css";
import LogoFluxity from "../../images/LogoFluxity.png";
import api from "../../services/api";

const Navbar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);

    // Verifica sessão toda vez que a rota muda ou componente monta
    useEffect(() => {
        const session = api.getSession();
        setUser(session);
    }, [location]);

    return (
        <nav className={styles.navbarContainer}>
            <Link to="/">
                <img src={LogoFluxity} alt="Fluxity Logo" className={styles.logo} />
            </Link>

            <div className={styles.navLinks}>
                <Link to="/empresa" className={styles.link}>Empresa</Link>
                <Link to="/" className={styles.link}>Produto</Link>
                <Link to="/compras" className={styles.link}>Compra</Link>
                <Link to="/adicionar-pce" className={styles.link}>P.C.E's</Link>
                
                {user ? (
                    // Se estiver logado, mostra o ícone/foto
                    <Link to={user.type === "empresa" ? "/perfilEmpresa" : "/perfil"} className={styles.profileContainer}>
                        {user.avatar ? (
                            <img src={user.avatar} alt="Perfil" className={styles.profileImage} />
                        ) : (
                            <IconUser className={styles.profileIcon} stroke={2} />
                        )}
                    </Link>
                ) : (
                    // Se NÃO estiver logado, mostra botões
                    <div className={styles.authButtons}>
                        <Link to="/login" className={styles.loginBtn}>Entrar</Link>
                        <Link to="/cadastro" className={styles.registerBtn}>Cadastro</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
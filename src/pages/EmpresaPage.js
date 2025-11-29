/* src/pages/EmpresaPage.js */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconPencil, IconStarFilled, IconLogout } from "@tabler/icons-react";
import Footer from "../components/layout/Footer";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import api from "../services/api";
import styles from "../styles/EmpresaPage.module.css";

const EmpresaPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form states
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [bio, setBio] = useState("");

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            navigate("/login");
            return;
        }

        if (session.type !== "empresa") {
            navigate("/perfil"); 
            return;
        }

        setCompany(session);
        setNome(session.name);
        setEmail(session.email);
        setEndereco(session.address || "");
        setCnpj(session.cnpj || "");
        setBio(session.bio || "");
    }, [navigate]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const payload = {
                name: nome,
                email: email,
                address: endereco,
                cnpj: cnpj,
                bio: bio
            };
            
            const response = await api.updateUser(company.id, payload);
            if (response.success) {
                alert("Informações da empresa atualizadas!");
                setCompany(response.user);
            }
        } catch (error) {
            alert("Erro ao atualizar: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- LOGOUT EMPRESA ---
    const handleLogout = () => {
        if (window.confirm("Deseja sair da conta empresarial?")) {
            api.logout();
            navigate("/");
        }
    };

    if (!company) return null;

    return (
        <div className={styles.pageContainer}>
            <NavbarVoltar />

            <div className={styles.banner}>
                {/* Aqui poderia ter imagem de banner igual ao userPage */}
            </div>

            <div className={styles.contentWrapper}>
                <aside className={styles.reviewsSidebar}>
                    <div className={styles.avatarWrapper}>
                        <button className={styles.editAvatarBtn}>
                            <IconPencil size={20} />
                        </button>
                    </div>

                    <div className={styles.ratingSummary}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <IconStarFilled key={star} size={20} className={styles.starYellow} />
                        ))}
                        <span className={styles.totalReviews}>5 estrelas</span>
                    </div>

                    <h3 className={styles.reviewsTitle}>Avaliações</h3>
                    <div className={styles.reviewsList}>
                        <p style={{fontSize: "0.8rem", color: "#666"}}>Nenhuma avaliação ainda.</p>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.headerInfo}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <h1 className={styles.companyName}>{company.name}</h1>
                            
                            {/* BOTÃO LOGOUT EMPRESA */}
                            <button 
                                onClick={handleLogout} 
                                style={{
                                    background: 'none', 
                                    border: '1px solid white', 
                                    color: 'white',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                <IconLogout size={16} /> Sair
                            </button>
                        </div>

                        <div className={styles.bioContainer}>
                            <h3 className={styles.bioTitle}>Descrição</h3>
                            <p className={styles.bioText}>
                                {bio || "Adicione uma descrição para sua empresa."}
                            </p>
                        </div>
                    </div>

                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Informações da empresa</h2>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome Fantasia</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>E-mail de Contato</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                             <label className={styles.label}>Descrição / Bio</label>
                             <textarea 
                                className={styles.input} 
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)}
                                rows="3"
                             />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Endereço</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>CNPJ</label>
                                <input
                                    type="text"
                                    className={styles.input}
                                    value={cnpj}
                                    onChange={(e) => setCnpj(e.target.value)}
                                />
                            </div>
                        </div>

                        <button className={styles.submitBtn} onClick={handleUpdate} disabled={loading}>
                            {loading ? "Salvando..." : "Editar Informações"}
                        </button>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default EmpresaPage;
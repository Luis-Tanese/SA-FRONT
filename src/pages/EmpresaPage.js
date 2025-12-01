/* src/pages/EmpresaPage.js */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    IconPencil,
    IconStarFilled,
    IconLogout,
    IconDeviceDesktopAnalytics,
    IconCheck,
    IconX,
    IconTrash,
    IconPlus,
} from "@tabler/icons-react";
import Footer from "../components/layout/Footer";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import api from "../services/api";
import styles from "../styles/EmpresaPage.module.css";

const EmpresaPage = () => {
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [pces, setPces] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [bio, setBio] = useState("");

    // Estado para edição de PCE
    const [editingPceId, setEditingPceId] = useState(null);
    const [tempPceName, setTempPceName] = useState("");

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

        loadPCEs(session.id);
    }, [navigate]);

    const loadPCEs = async (userId) => {
        const userPces = await api.getUserPCEs(userId);
        setPces(userPces);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const payload = {
                name: nome,
                email: email,
                address: endereco,
                cnpj: cnpj,
                bio: bio,
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

    // Funções para editar PCE
    const startEditingPce = (pce) => {
        setEditingPceId(pce.id);
        setTempPceName(pce.nome);
    };

    const cancelEditingPce = () => {
        setEditingPceId(null);
        setTempPceName("");
    };

    const savePceName = async (pceId) => {
        try {
            await api.renamePCE(company.id, pceId, tempPceName);
            await loadPCEs(company.id);
            setEditingPceId(null);
        } catch (error) {
            alert("Erro ao renomear PCE: " + error.message);
        }
    };

    const handleDeletePce = async (pceId) => {
        if (window.confirm("Tem certeza que deseja excluir este PCE?")) {
            try {
                await api.deletePCE(company.id, pceId);
                await loadPCEs(company.id);
            } catch (error) {
                alert("Erro ao excluir PCE: " + error.message);
            }
        }
    };

    if (!company) return null;

    return (
        <div className={styles.pageContainer}>
            <NavbarVoltar />

            <div className={styles.banner}>{/* Aqui poderia ter imagem de banner igual ao userPage */}</div>

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
                        <p style={{ fontSize: "0.8rem", color: "#666" }}>Nenhuma avaliação ainda.</p>
                    </div>
                </aside>

                <main className={styles.mainContent}>
                    <div className={styles.headerInfo}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h1 className={styles.companyName}>{company.name}</h1>

                            {/* BOTÃO LOGOUT EMPRESA */}
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: "none",
                                    border: "1px solid white",
                                    color: "white",
                                    padding: "5px 15px",
                                    borderRadius: "20px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                }}
                            >
                                <IconLogout size={16} /> Sair
                            </button>
                        </div>

                        <div className={styles.bioContainer}>
                            <h3 className={styles.bioTitle}>Descrição</h3>
                            <p className={styles.bioText}>{bio || "Adicione uma descrição para sua empresa."}</p>
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

                    {/* Lista de PCEs da Empresa */}
                    <div className={styles.formCard} style={{ marginTop: "20px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <h2 className={styles.formTitle} style={{ margin: 0 }}>
                                Meus PCEs
                            </h2>
                            <button
                                onClick={() => navigate("/adicionar-pce")}
                                style={{
                                    background: "#380016",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "35px",
                                    height: "35px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                }}
                                title="Adicionar novo PCE"
                            >
                                <IconPlus size={18} color="white" />
                            </button>
                        </div>

                        {pces.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "20px" }}>
                                <p style={{ color: "#666", fontSize: "0.9rem" }}>Nenhum PCE cadastrado ainda.</p>
                                <button
                                    onClick={() => navigate("/adicionar-pce")}
                                    style={{
                                        background: "#380016",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        marginTop: "10px",
                                    }}
                                >
                                    Adicionar primeiro PCE
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {pces.map((pce) => (
                                    <div
                                        key={pce.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "12px",
                                            background: "#f8f8f8",
                                            borderRadius: "8px",
                                            gap: "12px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "45px",
                                                height: "45px",
                                                background: "#fff",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {pce.urlImagem ? (
                                                <img
                                                    src={pce.urlImagem}
                                                    alt={pce.nome}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />
                                            ) : (
                                                <IconDeviceDesktopAnalytics size={24} color="#380016" />
                                            )}
                                        </div>

                                        <div style={{ flex: 1 }}>
                                            {editingPceId === pce.id ? (
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                    <input
                                                        type="text"
                                                        value={tempPceName}
                                                        onChange={(e) => setTempPceName(e.target.value)}
                                                        style={{
                                                            padding: "5px 10px",
                                                            border: "1px solid #ccc",
                                                            borderRadius: "5px",
                                                            flex: 1,
                                                        }}
                                                        autoFocus
                                                    />
                                                    <button
                                                        onClick={() => savePceName(pce.id)}
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <IconCheck size={18} color="green" />
                                                    </button>
                                                    <button
                                                        onClick={cancelEditingPce}
                                                        style={{
                                                            background: "none",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <IconX size={18} color="red" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                        <span style={{ fontWeight: "bold", color: "#333" }}>
                                                            {pce.nome}
                                                        </span>
                                                        <button
                                                            onClick={() => startEditingPce(pce)}
                                                            style={{
                                                                background: "none",
                                                                border: "none",
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <IconPencil size={14} color="#666" />
                                                        </button>
                                                    </div>
                                                    <small style={{ color: "#666" }}>
                                                        Nº {pce.numeroPCE} | Cap: {pce.capacidade || 0} | {pce.status}
                                                    </small>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleDeletePce(pce.id)}
                                            style={{ background: "none", border: "none", cursor: "pointer" }}
                                            title="Excluir PCE"
                                        >
                                            <IconTrash size={18} color="#c0392b" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default EmpresaPage;

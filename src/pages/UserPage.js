import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    IconPencil,
    IconDeviceDesktopAnalytics,
    IconCheck,
    IconX,
    IconLogout,
    IconTrash,
    IconPlus,
} from "@tabler/icons-react";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import api from "../services/api";
import styles from "../styles/UserPage.module.css";

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [pces, setPces] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");

    // State para edição de nome de PCE
    const [editingPceId, setEditingPceId] = useState(null);
    const [tempPceName, setTempPceName] = useState("");

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            navigate("/login");
            return;
        }

        if (session.type === "empresa") {
            navigate("/perfilEmpresa");
            return;
        }

        setUser(session);
        setName(session.name);
        setEmail(session.email);
        setBio(session.bio || "");
        setAvatarUrl(session.avatar || "");
        setBannerUrl(session.banner || "");

        loadPCEs(session.id);
    }, [navigate]);

    const loadPCEs = async (userId) => {
        const userPces = await api.getUserPCEs(userId);
        setPces(userPces);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await api.updateUser(user.id, {
                name,
                email,
                bio,
                avatar: avatarUrl,
                banner: bannerUrl,
            });
            if (response.success) {
                alert("Dados atualizados com sucesso!");
                setUser(response.user);
            }
        } catch (error) {
            alert("Erro ao atualizar: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    // --- FUNÇÃO DE LOGOUT ---
    const handleLogout = () => {
        const confirmExit = window.confirm("Tem certeza que deseja sair?");
        if (confirmExit) {
            api.logout();
            navigate("/");
        }
    };

    // Funções para renomear PCE
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
            await api.renamePCE(user.id, pceId, tempPceName);
            await loadPCEs(user.id);
            setEditingPceId(null);
        } catch (error) {
            alert("Erro ao renomear dispositivo: " + error.message);
        }
    };

    // Deletar PCE
    const handleDeletePce = async (pceId) => {
        if (window.confirm("Tem certeza que deseja excluir este PCE?")) {
            try {
                await api.deletePCE(user.id, pceId);
                await loadPCEs(user.id);
            } catch (error) {
                alert("Erro ao excluir PCE: " + error.message);
            }
        }
    };

    if (!user) return null;

    return (
        <div className={styles.pageContainer}>
            <NavbarVoltar />

            <div
                className={styles.banner}
                style={{
                    backgroundImage: bannerUrl ? `url(${bannerUrl})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></div>

            <div className={styles.contentContainer}>
                <div className={styles.profileSection}>
                    <div className={styles.avatarWrapper}>
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Avatar" className={styles.avatarImage} />
                        ) : (
                            <div className={styles.avatarPlaceholder} />
                        )}
                    </div>
                    <div className={styles.userInfo}>
                        <h1
                            className={styles.userName}
                            style={{
                                color: bannerUrl ? "#FFF" : "#000",
                                textShadow: bannerUrl ? "0 2px 4px rgba(0,0,0,0.5)" : "none",
                            }}
                        >
                            {user.name}
                        </h1>
                        <div className={styles.bioContainer}>
                            <h3 className={styles.bioTitle}>Biografia</h3>
                            <p className={styles.bioText}>{bio || "Adicione uma biografia..."}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.splitSection}>
                    {/* Formulário */}
                    <div className={styles.formCard}>
                        <div className={styles.cardHeaderRow}>
                            <h2 className={styles.formTitle}>Editar Perfil</h2>

                            {/* BOTÃO DE LOGOUT */}
                            <button onClick={handleLogout} className={styles.logoutBtn} title="Sair da conta">
                                <IconLogout size={20} />
                                Sair
                            </button>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>E-mail</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Bio</label>
                            <textarea
                                className={styles.input}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows="2"
                                style={{ resize: "none" }}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>URL da Foto</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={avatarUrl}
                                onChange={(e) => setAvatarUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>URL do Banner</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={bannerUrl}
                                onChange={(e) => setBannerUrl(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <button className={styles.submitBtn} onClick={handleUpdate} disabled={loading}>
                            {loading ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>

                    {/* Lista de PCEs */}
                    <div className={styles.ordersCard}>
                        <div className={styles.pcesHeader}>
                            <h2 className={styles.formTitle}>Meus Dispositivos</h2>
                            <button
                                onClick={() => navigate("/adicionar-pce")}
                                className={styles.addPceBtn}
                                title="Adicionar novo PCE"
                            >
                                <IconPlus size={18} />
                            </button>
                        </div>

                        {pces.length === 0 ? (
                            <div className={styles.emptyPces}>
                                <p style={{ color: "#666" }}>Você ainda não possui dispositivos cadastrados.</p>
                                <button onClick={() => navigate("/adicionar-pce")} className={styles.addFirstPceBtn}>
                                    Adicionar primeiro PCE
                                </button>
                            </div>
                        ) : (
                            <div className={styles.ordersList}>
                                {pces.map((pce) => (
                                    <div key={pce.id} className={styles.pceItem}>
                                        <div className={styles.pceIconBox}>
                                            {pce.urlImagem ? (
                                                <img
                                                    src={pce.urlImagem}
                                                    alt={pce.nome}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "5px",
                                                    }}
                                                />
                                            ) : (
                                                <IconDeviceDesktopAnalytics size={24} color="#380016" />
                                            )}
                                        </div>

                                        <div className={styles.pceInfo}>
                                            {editingPceId === pce.id ? (
                                                <div className={styles.editNameBox}>
                                                    <input
                                                        type="text"
                                                        value={tempPceName}
                                                        onChange={(e) => setTempPceName(e.target.value)}
                                                        className={styles.miniInput}
                                                        autoFocus
                                                    />
                                                    <button
                                                        onClick={() => savePceName(pce.id)}
                                                        className={styles.iconBtn}
                                                    >
                                                        <IconCheck size={18} color="green" />
                                                    </button>
                                                    <button onClick={cancelEditingPce} className={styles.iconBtn}>
                                                        <IconX size={18} color="red" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className={styles.pceName}>{pce.nome}</span>
                                                    <button
                                                        onClick={() => startEditingPce(pce)}
                                                        className={styles.renameBtn}
                                                    >
                                                        <IconPencil size={14} />
                                                    </button>
                                                </>
                                            )}
                                            <small className={styles.pceDate}>
                                                Nº {pce.numeroPCE} | Cap: {pce.capacidade || 0}
                                            </small>
                                        </div>

                                        <button
                                            onClick={() => handleDeletePce(pce.id)}
                                            className={styles.deletePceBtn}
                                            title="Excluir PCE"
                                        >
                                            <IconTrash size={16} color="#c0392b" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;

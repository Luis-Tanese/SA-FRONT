import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    IconPencil, 
    IconDeviceDesktopAnalytics, 
    IconCheck, 
    IconX, 
    IconLogout 
} from "@tabler/icons-react";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import api from "../services/api";
import styles from "../styles/UserPage.module.css";

const UserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");

    // State para edição de nome de PCE
    const [editingItemId, setEditingItemId] = useState(null);
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

        loadOrders(session.id);
    }, [navigate]);

    const loadOrders = async (userId) => {
        const userOrders = await api.getUserOrders(userId);
        setOrders(userOrders);
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await api.updateUser(user.id, { 
                name, 
                email, 
                bio, 
                avatar: avatarUrl, 
                banner: bannerUrl 
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
            api.logout(); // Limpa a sessão
            navigate("/"); // Redireciona para Home
        }
    };

    // Funções para renomear PCE
    const startEditingPce = (item) => {
        setEditingItemId(item.uniqueId);
        setTempPceName(item.customName);
    };

    const cancelEditingPce = () => {
        setEditingItemId(null);
        setTempPceName("");
    };

    const savePceName = async (orderId, itemUniqueId) => {
        try {
            await api.updateOrderItemName(user.id, orderId, itemUniqueId, tempPceName);
            await loadOrders(user.id);
            setEditingItemId(null);
        } catch (error) {
            alert("Erro ao renomear dispositivo.");
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
                    backgroundPosition: "center"
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
                        <h1 className={styles.userName} style={{ color: bannerUrl ? "#FFF" : "#000", textShadow: bannerUrl ? "0 2px 4px rgba(0,0,0,0.5)" : "none" }}>
                            {user.name}
                        </h1>
                        <div className={styles.bioContainer}>
                            <h3 className={styles.bioTitle}>Biografia</h3>
                            <p className={styles.bioText}>
                                {bio || "Adicione uma biografia..."}
                            </p>
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
                        <h2 className={styles.formTitle}>Meus Dispositivos</h2>
                        
                        {orders.length === 0 ? (
                            <p style={{ color: "#666" }}>Você ainda não comprou dispositivos.</p>
                        ) : (
                            <div className={styles.ordersList}>
                                {orders.map((order) => (
                                    <React.Fragment key={order.id}>
                                        {order.items.map((item) => (
                                            <div key={item.uniqueId} className={styles.pceItem}>
                                                <div className={styles.pceIconBox}>
                                                    <IconDeviceDesktopAnalytics size={24} color="#380016"/>
                                                </div>
                                                
                                                <div className={styles.pceInfo}>
                                                    {editingItemId === item.uniqueId ? (
                                                        <div className={styles.editNameBox}>
                                                            <input 
                                                                type="text" 
                                                                value={tempPceName}
                                                                onChange={(e) => setTempPceName(e.target.value)}
                                                                className={styles.miniInput}
                                                                autoFocus
                                                            />
                                                            <button onClick={() => savePceName(order.id, item.uniqueId)} className={styles.iconBtn}>
                                                                <IconCheck size={18} color="green" />
                                                            </button>
                                                            <button onClick={cancelEditingPce} className={styles.iconBtn}>
                                                                <IconX size={18} color="red" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className={styles.pceName}>{item.customName}</span>
                                                            <button onClick={() => startEditingPce(item)} className={styles.renameBtn}>
                                                                <IconPencil size={14} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <small className={styles.pceDate}>ID: {item.uniqueId.slice(-4)}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>
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
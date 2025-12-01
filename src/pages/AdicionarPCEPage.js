import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import Footer from "../components/layout/Footer";
import api from "../services/api";
import styles from "../styles/AdicionarPCEPage.module.css";
// Certifique-se de ter uma imagem de porta ou use um placeholder
import DoorImage from "../images/fundoCadastro.png";

const AdicionarPCEPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [pceStats, setPceStats] = useState({ total: 0, registered: 0, unregistered: 0 });
    const [formData, setFormData] = useState({
        nome: "",
        urlImagem: "",
        numeroPCE: "",
        capacidade: "",
        endereco: "",
        mostrarEndereco: false,
        descricao: "",
    });

    const loadStats = useCallback(
        async (userId) => {
            try {
                const stats = await api.getPceStats(userId);
                setPceStats(stats);

                // Se não há PCEs disponíveis, redirecionar para compras
                if (stats.unregistered === 0) {
                    alert("Você não possui PCEs disponíveis para cadastrar. Compre mais PCEs primeiro!");
                    navigate("/compras");
                }
            } catch (error) {
                console.error("Erro ao carregar estatísticas:", error);
            }
        },
        [navigate]
    );

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            alert("Você precisa estar logado para cadastrar PCEs.");
            navigate("/login");
            return;
        }
        setUser(session);
        loadStats(session.id);
    }, [navigate, loadStats]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.numeroPCE) {
            alert("Por favor, preencha o nome e o número do PCE.");
            return;
        }

        setLoading(true);
        try {
            await api.registerPCE(user.id, formData);
            alert("P.C.E cadastrado com sucesso!");
            navigate("/pce");
        } catch (error) {
            alert("Erro ao cadastrar P.C.E: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <NavbarVoltar />

            <div className={styles.mainContent}>
                {/* Lado Esquerdo - Banner */}
                <div className={styles.leftPanel}>
                    <div className={styles.bannerContent}>
                        <h1 className={styles.fluxityTitle}>Fluxity</h1>
                        <h2 className={styles.subTitle}>
                            Cadastrar <span className={styles.highlight}>P.C.E</span>
                        </h2>
                        <p className={styles.availableText}>
                            {pceStats.unregistered} PCE(s) disponível(is) para cadastro
                        </p>
                        <div className={styles.imageContainer}>
                            <img src={DoorImage} alt="Porta Fluxity" className={styles.doorImage} />
                        </div>
                    </div>
                </div>

                {/* Lado Direito - Formulário */}
                <div className={styles.rightPanel}>
                    <form onSubmit={handleSubmit} className={styles.formContainer}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Nome</label>
                            <input
                                type="text"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup} style={{ flex: 2 }}>
                                <label className={styles.label}>Url Imagem</label>
                                <input
                                    type="text"
                                    name="urlImagem"
                                    value={formData.urlImagem}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            {/* Preview box placeholder */}
                            <div className={styles.urlPreviewBox}>
                                <span>URL</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Número do P.C.E</label>
                            <input
                                type="text"
                                name="numeroPCE"
                                value={formData.numeroPCE}
                                onChange={handleChange}
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Capacidade</label>
                                <input
                                    type="number"
                                    name="capacidade"
                                    value={formData.capacidade}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            <div className={styles.formGroup} style={{ flex: 1.5 }}>
                                <label className={styles.label}>Endereço</label>
                                <input
                                    type="text"
                                    name="endereco"
                                    value={formData.endereco}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>

                        <div className={styles.checkboxWrapper}>
                            <label className={styles.checkboxLabel}>
                                mostrar endereço?
                                <input
                                    type="checkbox"
                                    name="mostrarEndereco"
                                    checked={formData.mostrarEndereco}
                                    onChange={handleChange}
                                    className={styles.checkbox}
                                />
                            </label>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Descrição</label>
                            <textarea
                                name="descricao"
                                value={formData.descricao}
                                onChange={handleChange}
                                className={`${styles.input} ${styles.textarea}`}
                                rows="3"
                            ></textarea>
                        </div>

                        <div className={styles.actions}>
                            <button
                                type="submit"
                                className={styles.btnAdd}
                                disabled={loading || pceStats.unregistered === 0}
                            >
                                {loading ? "Cadastrando..." : "Cadastrar P.C.E."}
                            </button>
                            <button type="button" className={styles.btnCancel} onClick={() => navigate("/pce")}>
                                cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdicionarPCEPage;

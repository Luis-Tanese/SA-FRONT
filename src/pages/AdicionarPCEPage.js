import React, { useState } from "react";
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
    const [formData, setFormData] = useState({
        nome: "",
        urlImagem: "",
        numeroPCE: "",
        capacidade: "",
        endereco: "",
        descricao: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.addPCE(formData);
            alert("P.C.E adicionado com sucesso!");
            navigate("/perfil"); // Redireciona para onde fizer sentido
        } catch (error) {
            alert("Erro ao adicionar P.C.E.");
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
                            Adicionar novos <span className={styles.highlight}>P.C.E's</span>
                        </h2>
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
                                <input type="checkbox" className={styles.checkbox} />
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
                            <button type="submit" className={styles.btnAdd} disabled={loading}>
                                {loading ? "Adicionando..." : "Adicionar P.C.E."}
                            </button>
                            <button
                                type="button"
                                className={styles.btnCancel}
                                onClick={() => navigate(-1)}
                            >
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
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
    IconPlus,
    IconPencil,
    IconTrash,
    IconCheck,
    IconX,
    IconDeviceDesktopAnalytics,
    IconShoppingCart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../services/api";
import "../styles/PagePceWithRegistration.css";

const PagePceWithRegistration = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [pces, setPces] = useState([]);
    const [pceStats, setPceStats] = useState({ total: 0, registered: 0, unregistered: 0 });
    const [loading, setLoading] = useState(true);

    // Estado para edição de nome
    const [editingId, setEditingId] = useState(null);
    const [tempName, setTempName] = useState("");

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            navigate("/login");
            return;
        }
        setUser(session);
        loadData(session.id);
    }, [navigate]);

    const loadData = async (userId) => {
        setLoading(true);
        try {
            const [userPces, stats] = await Promise.all([api.getUserPCEs(userId), api.getPceStats(userId)]);
            setPces(userPces);
            setPceStats(stats);
        } catch (error) {
            console.error("Erro ao carregar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    // Iniciar edição
    const startEditing = (pce) => {
        setEditingId(pce.id);
        setTempName(pce.nome);
    };

    // Cancelar edição
    const cancelEditing = () => {
        setEditingId(null);
        setTempName("");
    };

    // Salvar novo nome
    const saveName = async (pceId) => {
        try {
            await api.renamePCE(user.id, pceId, tempName);
            await loadData(user.id);
            setEditingId(null);
            setTempName("");
        } catch (error) {
            alert("Erro ao renomear PCE: " + error.message);
        }
    };

    // Deletar PCE
    const handleDelete = async (pceId) => {
        if (window.confirm("Tem certeza que deseja excluir este PCE? O slot será liberado para cadastrar novamente.")) {
            try {
                await api.deletePCE(user.id, pceId);
                await loadData(user.id);
            } catch (error) {
                alert("Erro ao excluir PCE: " + error.message);
            }
        }
    };

    // Verificar se pode adicionar PCE
    const handleAddPce = () => {
        if (pceStats.unregistered === 0) {
            alert("Você não possui PCEs disponíveis para cadastrar. Compre mais PCEs primeiro!");
            navigate("/compras");
        } else {
            navigate("/adicionar-pce");
        }
    };

    return (
        <div className="page-layout">
            <Navbar />

            <div className="main-content-fluid">
                <Row className="g-0 h-100">
                    {/* LADO ESQUERDO: CINZA */}
                    <Col lg={5} className="left-panel panel-gray">
                        <div className="sidebar-gray-content">
                            <h1 className="gray-title">P.C.E.</h1>
                            <h4 className="gray-subtitle">Controle e Gestão</h4>
                            <p className="gray-text">
                                Caso deseje controlar, verificar gráficos, percentuais, processamento, horas
                                funcionando, lotação atual e estado da sua empresa, basta acessar os cards ao lado.
                            </p>

                            {/* ESTATÍSTICAS DE PCEs */}
                            <div className="pce-stats-box">
                                <div className="stat-item">
                                    <span className="stat-number">{pceStats.total}</span>
                                    <span className="stat-label">Comprados</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">{pceStats.registered}</span>
                                    <span className="stat-label">Cadastrados</span>
                                </div>
                                <div className="stat-item highlight">
                                    <span className="stat-number">{pceStats.unregistered}</span>
                                    <span className="stat-label">Disponíveis</span>
                                </div>
                            </div>

                            {/* BOTÕES */}
                            <div className="buttons-container">
                                {/* Botão de Cadastrar PCE */}
                                <div
                                    className={`btn-add-visual ${pceStats.unregistered === 0 ? "disabled" : ""}`}
                                    onClick={handleAddPce}
                                    role="button"
                                >
                                    <IconPlus size={40} stroke={3} />
                                </div>
                                <p className="add-label">
                                    {pceStats.unregistered > 0
                                        ? `Cadastrar P.C.E. (${pceStats.unregistered} disponíveis)`
                                        : "Nenhum disponível"}
                                </p>

                                {/* Botão de Comprar mais */}
                                <div className="btn-buy-visual" onClick={() => navigate("/compras")} role="button">
                                    <IconShoppingCart size={30} stroke={2} />
                                </div>
                                <p className="add-label">Comprar mais P.C.E.</p>
                            </div>
                        </div>
                    </Col>

                    {/* LADO DIREITO: LISTA DE PCEs */}
                    <Col lg={7} className="right-panel">
                        {loading ? (
                            <div className="empty-state">
                                <h5>Carregando...</h5>
                            </div>
                        ) : pces.length === 0 ? (
                            <div className="empty-state">
                                {pceStats.total === 0 ? (
                                    <>
                                        <h5>Nenhum P.C.E. Comprado...</h5>
                                        <p className="empty-hint">Compre seu primeiro PCE para começar!</p>
                                        <button className="btn-empty-buy" onClick={() => navigate("/compras")}>
                                            <IconShoppingCart size={20} /> Comprar PCE
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h5>Nenhum P.C.E. Cadastrado...</h5>
                                        <p className="empty-hint">
                                            Você tem {pceStats.unregistered} PCE(s) disponível(is) para cadastrar!
                                        </p>
                                        <button
                                            className="btn-empty-register"
                                            onClick={() => navigate("/adicionar-pce")}
                                        >
                                            <IconPlus size={20} /> Cadastrar PCE
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="pce-list-container">
                                {pces.map((pce) => (
                                    <div key={pce.id} className="pce-card">
                                        <div className="pce-card-icon">
                                            {pce.urlImagem ? (
                                                <img src={pce.urlImagem} alt={pce.nome} />
                                            ) : (
                                                <IconDeviceDesktopAnalytics size={40} color="#380016" />
                                            )}
                                        </div>
                                        <div className="pce-card-info">
                                            {editingId === pce.id ? (
                                                <div className="pce-edit-row">
                                                    <input
                                                        type="text"
                                                        value={tempName}
                                                        onChange={(e) => setTempName(e.target.value)}
                                                        className="pce-edit-input"
                                                        autoFocus
                                                    />
                                                    <button onClick={() => saveName(pce.id)} className="pce-icon-btn">
                                                        <IconCheck size={18} color="green" />
                                                    </button>
                                                    <button onClick={cancelEditing} className="pce-icon-btn">
                                                        <IconX size={18} color="red" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <h5 className="pce-card-title">{pce.nome}</h5>
                                                    <p className="pce-card-number">Nº {pce.numeroPCE}</p>
                                                </>
                                            )}
                                            <p className="pce-card-desc">{pce.descricao || "Sem descrição"}</p>
                                            <div className="pce-card-stats">
                                                <span>Capacidade: {pce.capacidade}</span>
                                                <span>Lotação: {pce.lotacaoAtual}</span>
                                                <span className={`pce-status ${pce.status}`}>{pce.status}</span>
                                            </div>
                                        </div>
                                        <div className="pce-card-actions">
                                            {editingId !== pce.id && (
                                                <>
                                                    <button
                                                        onClick={() => startEditing(pce)}
                                                        className="pce-action-btn edit"
                                                        title="Renomear"
                                                    >
                                                        <IconPencil size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(pce.id)}
                                                        className="pce-action-btn delete"
                                                        title="Excluir"
                                                    >
                                                        <IconTrash size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default PagePceWithRegistration;

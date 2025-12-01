import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import api from "../services/api";
import doorImage from "../images/Porta da Tela Adicionar PCE.png";
import "../styles/PceRegistrationForm.css";

const PceRegistrationForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: "",
        urlImagem: "",
        numeroPce: "",
        capacidade: "",
        endereco: "",
        mostrarEndereco: false,
        descricao: "",
    });

    useEffect(() => {
        const session = api.getSession();
        if (!session) {
            alert("Você precisa estar logado para adicionar PCEs.");
            navigate("/login");
            return;
        }
        setUser(session);
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.numeroPce) {
            alert("Por favor, preencha o nome e o número do PCE.");
            return;
        }

        setLoading(true);
        try {
            await api.addPCE(user.id, {
                nome: formData.nome,
                urlImagem: formData.urlImagem,
                numeroPCE: formData.numeroPce,
                capacidade: formData.capacidade,
                endereco: formData.endereco,
                mostrarEndereco: formData.mostrarEndereco,
                descricao: formData.descricao,
            });
            alert("P.C.E adicionado com sucesso!");
            navigate("/pce");
        } catch (error) {
            alert("Erro ao adicionar P.C.E: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="main-content-fluid">
                <Row className="h-100 g-0">
                    {/* LADO ESQUERDO: PRETO COM PORTA */}
                    <Col lg={5} className="left-panel panel-black">
                        <div className="left-content">
                            <h1 className="brand-title">Fluxity</h1>
                            <h3 className="brand-subtitle">
                                Adicionar novos <span className="text-wine">P.C.E's</span>
                            </h3>
                        </div>
                        <div className="door-image-container">
                            <img src={doorImage} alt="Porta" className="door-img" />
                        </div>
                    </Col>

                    {/* LADO DIREITO: FORMULÁRIO BRANCO */}
                    <Col lg={7} className="right-panel">
                        <Container className="form-wrapper">
                            <Form onSubmit={handleSubmit}>
                                <Row className="mb-3">
                                    <Col md={8}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nome</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nome"
                                                className="custom-input"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Url Imagem</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="urlImagem"
                                                className="custom-input"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <div className="url-box">
                                            {formData.urlImagem ? (
                                                <img src={formData.urlImagem} alt="Preview" />
                                            ) : (
                                                <span>URL</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>Número do P.C.E</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="numeroPce"
                                        className="custom-input"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Row className="mb-2">
                                    <Col md={4}>
                                        <Form.Group>
                                            <Form.Label>Capacidade</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="capacidade"
                                                className="custom-input"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>Endereço</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="endereco"
                                                className="custom-input"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-flex justify-content-end mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="mostrar endereço?"
                                        name="mostrarEndereco"
                                        className="custom-checkbox"
                                        onChange={handleChange}
                                    />
                                </div>

                                <Form.Group className="mb-5">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="descricao"
                                        className="custom-input resize-none"
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-flex flex-column align-items-center gap-2">
                                    <Button type="submit" className="btn-custom-submit" disabled={loading}>
                                        {loading ? "Adicionando..." : "Adicionar P.C.E."}
                                    </Button>
                                    {/* BOTÃO CANCELAR VOLTA PARA A ROTA /PCE */}
                                    <span className="cancel-text" onClick={() => navigate("/pce")}>
                                        cancelar
                                    </span>
                                </div>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </div>
            <Footer />
        </div>
    );
};

export default PceRegistrationForm;

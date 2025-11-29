import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import api from "../services/api";
import styles from "../styles/CadastroPage.module.css";

const CadastroPage = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("usuario");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        cnpj: "",
    });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleTabChange = (type) => setUserType(type);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Prepara o objeto para envio, incluindo o tipo de usuário
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                type: userType, // 'usuario' ou 'empresa'
                // Campos opcionais dependendo do tipo
                ...(userType === "empresa" && { address: formData.address, cnpj: formData.cnpj }),
                bio: "", // Inicializa vazio
            };

            const response = await api.register(payload);

            if (response.success) {
                alert("Cadastro realizado com sucesso!");
                // Redirecionamento inteligente
                if (userType === "empresa") {
                    navigate("/perfilEmpresa");
                } else {
                    navigate("/perfil");
                }
            }
        } catch (error) {
            alert("Erro no cadastro: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Cadastro</h2>

                <div className={styles.tabContainer}>
                    <span
                        className={`${styles.tabItem} ${userType === "usuario" ? styles.activeTab : ""}`}
                        onClick={() => handleTabChange("usuario")}
                    >
                        Usuário
                    </span>
                    <span
                        className={`${styles.tabItem} ${userType === "empresa" ? styles.activeTab : ""}`}
                        onClick={() => handleTabChange("empresa")}
                    >
                        Empresa
                    </span>
                </div>

                <Form onSubmit={handleSubmit} className={styles.formContainer}>
                    <Form.Group className="mb-3">
                        <Form.Label className={styles.label}>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={styles.label}>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className={styles.label}>Senha</Form.Label>
                        <InputGroup className={styles.passwordGroup}>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`${styles.input} ${styles.passwordInput}`}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <InputGroup.Text className={styles.eyeIconWrapper} onClick={togglePasswordVisibility}>
                                {showPassword ? <IconEyeOff size={20} color="#555" /> : <IconEye size={20} color="#555" />}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {userType === "empresa" && (
                        <div className={styles.rowGroup}>
                            <Form.Group className="mb-3" style={{ flex: 1 }}>
                                <Form.Label className={styles.label}>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    className={styles.input}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ flex: 1 }}>
                                <Form.Label className={styles.label}>CNPJ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="cnpj"
                                    className={styles.input}
                                    value={formData.cnpj}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </div>
                    )}

                    <Button variant="primary" type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Cadastrando..." : "Cadastrar-se"}
                    </Button>
                </Form>

                <div className={styles.footer}>
                    <Link to="/login" className={styles.backLink}>Voltar</Link>
                </div>
            </div>
        </div>
    );
};

export default CadastroPage;
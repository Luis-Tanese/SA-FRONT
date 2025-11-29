import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import styles from "../styles/CadastroPage.module.css";

const CadastroPage = () => {
    const [userType, setUserType] = useState("usuario"); // 'usuario' ou 'empresa'
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        cnpj: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleTabChange = (type) => {
        setUserType(type);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Cadastro [${userType}] submit:`, formData);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.card}>
                <h2 className={styles.title}>Cadastro</h2>

                {/* Abas de Seleção */}
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
                    {/* Campos Comuns: Nome */}
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label className={styles.label}>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Campos Comuns: E-mail */}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label className={styles.label}>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    {/* Campos Comuns: Senha */}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className={styles.label}>Senha</Form.Label>
                        <InputGroup className={styles.passwordGroup}>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`${styles.input} ${styles.passwordInput}`}
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <InputGroup.Text className={styles.eyeIconWrapper} onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <IconEyeOff size={20} color="#555" />
                                ) : (
                                    <IconEye size={20} color="#555" />
                                )}
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    {/* Campos Específicos de Empresa */}
                    {userType === "empresa" && (
                        <div className={styles.rowGroup}>
                            <Form.Group className="mb-3" style={{ flex: 1 }} controlId="formAddress">
                                <Form.Label className={styles.label}>Endereço</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    className={styles.input}
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" style={{ flex: 1 }} controlId="formCnpj">
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

                    {/* Botão */}
                    <Button variant="primary" type="submit" className={styles.submitBtn}>
                        Cadastrar-se
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
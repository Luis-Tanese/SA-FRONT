import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
        console.log("Login submit:", formData);
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                <h2 className={styles.title}>Login</h2>

                <Form onSubmit={handleSubmit}>
                    {/* Campo Nome */}
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

                    {/* Campo E-mail */}
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

                    {/* Campo Senha */}
                    <Form.Group className="mb-4" controlId="formPassword">
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

                    {/* Botão */}
                    <Button variant="primary" type="submit" className={styles.submitBtn}>
                        Entrar
                    </Button>
                </Form>

                <div className={styles.footer}>
                    Não possui uma conta? <Link to="/cadastro">cadastre-se</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
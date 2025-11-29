import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import api from "../services/api";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.login(formData.email, formData.password);
            
            if (response.success) {
                // Redireciona baseado no tipo de usuário
                if (response.user.type === "empresa") {
                    navigate("/perfilEmpresa");
                } else {
                    navigate("/perfil");
                }
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.loginCard}>
                <h2 className={styles.title}>Login</h2>
                <Form onSubmit={handleSubmit}>
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

                    <Form.Group className="mb-4">
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

                    <Button variant="primary" type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
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
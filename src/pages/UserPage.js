import React, { useState } from "react";
import { IconPencil } from "@tabler/icons-react";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import styles from "../styles/UserPage.module.css";

const UserPage = () => {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");

	return (
		<div className={styles.pageContainer}>
			<NavbarVoltar />

			<div className={styles.banner}>
				<IconPencil size={24} color="white" className={styles.editAvatarBtn} />
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.profileSection}>
					<div className={styles.avatarWrapper}>
						<button className={styles.editAvatarBtn}>
							<IconPencil size={20} />
						</button>
					</div>
					<div className={styles.userInfo}>
						<h1 className={styles.userName}>Nome Usuário</h1>
						<div className={styles.bioContainer}>
							<h3 className={styles.bioTitle}>Biografia</h3>
							<p className={styles.bioText}>
								Lorem ipsum aqui ficaria a biografia do usuário estou escrevendo coisas aleatórias
								somente para ocupar... <span className={styles.seeMore}>ver mais</span>
							</p>
						</div>
					</div>
				</div>

				<div className={styles.formCard}>
					<h2 className={styles.formTitle}>Informações pessoais</h2>

					<div className={styles.formGroup}>
						<label className={styles.label}>Nome</label>
						<input
							type="text"
							className={styles.input}
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							placeholder="Digite seu nome"
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>E-mail</label>
						<input
							type="email"
							className={styles.input}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Digite seu e-mail"
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Senha</label>
						<input
							type="password"
							className={styles.input}
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							placeholder="Digite sua senha"
						/>
					</div>

					<button className={styles.submitBtn}>editar</button>
				</div>
			</div>
		</div>
	);
};

export default UserPage;

/* src/pages/EmpresaPage.js */
import React, { useState } from "react";
import { IconPencil, IconStarFilled } from "@tabler/icons-react";
import Footer from "../components/layout/Footer";
import NavbarVoltar from "../components/layout/NavbarVoltar";
import styles from "../styles/EmpresaPage.module.css";

const EmpresaPage = () => {
	const [nome, setNome] = useState("");
	const [email, setEmail] = useState("");
	const [emailSecundario, setEmailSecundario] = useState("");
	const [endereco, setEndereco] = useState("");
	const [cnpj, setCnpj] = useState("");

	const reviews = [1, 2, 3, 4, 5, 6, 7];

	return (
		<div className={styles.pageContainer}>
			<NavbarVoltar />

			<div className={styles.banner}>
				<IconPencil size={24} color="white" className={styles.editAvatarBtn} />
			</div>

			<div className={styles.contentWrapper}>
				<aside className={styles.reviewsSidebar}>
					<div className={styles.avatarWrapper}>
						<button className={styles.editAvatarBtn}>
							<IconPencil size={20} />
						</button>
					</div>

					<div className={styles.ratingSummary}>
						{[1, 2, 3, 4, 5].map((star) => (
							<IconStarFilled key={star} size={20} className={styles.starYellow} />
						))}
						<span className={styles.totalReviews}>5 estrelas</span>
					</div>

					<h3 className={styles.reviewsTitle}>Avaliações</h3>

					<div className={styles.reviewsList}>
						{reviews.map((item, index) => (
							<div key={index} className={styles.reviewItem}>
								<div className={styles.reviewAvatar}></div>
								<div className={styles.reviewContent}>
									<span className={styles.reviewUser}>User123</span>
									<div className={styles.reviewStars}>
										{[1, 2, 3, 4].map((s) => (
											<IconStarFilled key={s} size={12} className={styles.starYellow} />
										))}
										<IconStarFilled size={12} style={{ color: "#ccc", fill: "#ccc" }} />
									</div>
									<span className={styles.reviewText}>4 estrelas</span>
								</div>
							</div>
						))}
					</div>
				</aside>

				<main className={styles.mainContent}>
					<div className={styles.headerInfo}>
						<h1 className={styles.companyName}>Nome empresa</h1>

						<div className={styles.bioContainer}>
							<h3 className={styles.bioTitle}>Descrição</h3>
							<p className={styles.bioText}>
								Lorem ipsum aqui ficaria a biografia do usuário estou escrevendo coisas aleatórias
								somente para ocupar...
								<span className={styles.seeMore}>ver mais</span>
							</p>
						</div>
					</div>

					<div className={styles.formCard}>
						<h2 className={styles.formTitle}>Informações da empresa</h2>

						<div className={styles.formGroup}>
							<label className={styles.label}>Nome</label>
							<input
								type="text"
								className={styles.input}
								value={nome}
								onChange={(e) => setNome(e.target.value)}
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
							<label className={styles.label}>E-mail</label>
							<input
								type="email"
								className={styles.input}
								value={emailSecundario}
								onChange={(e) => setEmailSecundario(e.target.value)}
							/>
						</div>

						<div className={styles.row}>
							<div className={styles.formGroup}>
								<label className={styles.label}>Endereço</label>
								<input
									type="text"
									className={styles.input}
									value={endereco}
									onChange={(e) => setEndereco(e.target.value)}
								/>
							</div>
							<div className={styles.formGroup}>
								<label className={styles.label}>CNPJ</label>
								<input
									type="text"
									className={styles.input}
									value={cnpj}
									onChange={(e) => setCnpj(e.target.value)}
								/>
							</div>
						</div>

						<button className={styles.submitBtn}>editar</button>
					</div>
				</main>
			</div>

			<Footer />
		</div>
	);
};

export default EmpresaPage;

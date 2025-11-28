import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WelcomeTitle from "../components/layout/WelcomeTitle";
import AppDownload from "../components/layout/AppDownload";
import AppInfo from "../components/layout/AppInfo";

const Empresa = () => {
	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
			<Navbar />

			<main style={{ flex: 1, backgroundColor: "#FFFFFF", width: "100%" }}>
				<WelcomeTitle />
				<AppInfo />
				<AppDownload />
			</main>

			<Footer />
		</div>
	);
};

export default Empresa;

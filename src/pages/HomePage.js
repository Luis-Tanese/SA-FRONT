import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BannerFluxity from "../components/layout/Bannerfluxity";
import TextoSobreUm from "../components/layout/TextoSobreUm";
import TextoSobreDois from "../components/layout/TextoSobreDois";

const HomePage = () => {
	return (
		<div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", width: "100%" }}>
			<Navbar />

			<main style={{ flex: 1, backgroundColor: "#ffffffff", width: "100%" }}>
				<BannerFluxity />
				<TextoSobreUm />
				<TextoSobreDois />
			</main>

			<Footer />
		</div>
	);
};

export default HomePage;

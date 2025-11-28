import React from "react";
import { Routes, Route } from "react-router-dom";
import EmpresaPage from "./pages/EmpresaPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/perfil" element={<UserPage />} />

				<Route path="/empresa" element={<UserPage />} />

				<Route path="/perfilEmpresa" element={<EmpresaPage />} />
			</Routes>
		</div>
	);
}

export default App;

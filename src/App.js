import React from "react";
import { Routes, Route } from "react-router-dom";
import Empresa from "./pages/Empresa";
import EmpresaPage from "./pages/EmpresaPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />

                <Route path="/perfil" element={<UserPage />} />

                <Route path="/empresa" element={<Empresa />} />

                <Route path="/perfilEmpresa" element={<EmpresaPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/cadastro" element={<CadastroPage />} />
            </Routes>
        </div>
    );
}

export default App;

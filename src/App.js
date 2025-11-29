import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import EmpresaPage from "./pages/EmpresaPage";
import Empresa from "./pages/Empresa"; // Landing page da empresa
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";
import AdicionarPCEPage from "./pages/AdicionarPCEPage";
import CompraPage from "./pages/CompraPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastro" element={<CadastroPage />} />
                
                {/* Rotas de Usuário Logado */}
                <Route path="/perfil" element={<UserPage />} />
                <Route path="/adicionar-pce" element={<AdicionarPCEPage />} />
                <Route path="/compras" element={<CompraPage />} />

                {/* Rotas de Empresa */}
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/perfilEmpresa" element={<EmpresaPage />} />
            </Routes>
        </div>
    );
}

export default App;
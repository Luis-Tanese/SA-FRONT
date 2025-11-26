import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Empresa from "./pages/Empresa";
import "bootstrap/dist/css/bootstrap.min.css"; 

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/empresa" element={<Empresa />} />
        </Routes>
    );
}

export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";

function App() {
    return (
        <Layout>
            <Container className="my-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Container>
        </Layout>
    );
}

export default App;

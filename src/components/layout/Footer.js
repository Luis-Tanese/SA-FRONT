import React from "react";
import { Container } from "react-bootstrap";
import { IconCopyright } from "@tabler/icons-react";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white text-center py-3 mt-auto">
            <Container>
                <p className="mb-0">
                    <IconCopyright size={16} style={{ verticalAlign: "middle" }} /> {currentYear} Projeto S.A. Todos os
                    direitos reservados.
                </p>
            </Container>
        </footer>
    );
}

export default Footer;

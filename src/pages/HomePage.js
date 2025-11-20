import React from "react";
import { IconCode } from "@tabler/icons-react";

function HomePage() {
    return (
        <div className="text-center mt-5">
            <IconCode size={48} strokeWidth={1.5} />
            <h1 className="mt-3">Página Inicial</h1>
            <p className="lead">
                Esta é uma página placeholder gurizada.
            </p>
            <p>Quem for fazer essa bomba n se esqueça de arrumar.</p>
        </div>
    );
}

export default HomePage;

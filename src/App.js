import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./components/PaginaInicial/PaginaInicial";
import Horario from "./components/Horario/Horario";
import "./assets/styles.css";
import "./assets/reset.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/filme/:idFilme" element={<Horario />} />
            </Routes>
        </BrowserRouter>
    )
}
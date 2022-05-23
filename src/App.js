import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from "./components/PaginaInicial/PaginaInicial";
import PaginaHorario from "./components/PaginaHorario/PaginaHorario";
import PaginaSessoes from "./components/PaginaSessoes/PaginaSessoes";
import PaginaSucesso from "./components/PaginaSucesso/PaginaSucesso";
import "./assets/styles.css";
import "./assets/reset.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaInicial />} />
                <Route path="/filme/:idFilme" element={<PaginaHorario />} />
                <Route path="/sessao/:idSessao" element={<PaginaSessoes />} />
                <Route path="/sucesso" element={<PaginaSucesso />} />
            </Routes>
        </BrowserRouter>
    )
}
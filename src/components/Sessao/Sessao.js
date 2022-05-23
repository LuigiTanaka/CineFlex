import "./style-sessao.css";
import { Link } from "react-router-dom";

function criaHora(hora) {
    return (
        <Link to={`/sessao/${hora.id}`}>
            <div className="hora">{hora.name}</div>
        </Link>
    )
}

export default function Sessao({ diaSemana, data, horarios }) {
    return (
        <div className="sessao">
            <h3>{`${diaSemana} - ${data}`}</h3>
            <div className="horas">
                {horarios.map(hora => criaHora(hora))}
            </div>
        </div>
    )
}
import "./style-sessao.css";

export default function Sessao({ diaSemana, data, horarios }) {
    return (
        <div className="sessao">
            <h3>{`${diaSemana} - ${data}`}</h3>
            <div className="horas">
                {horarios.map((hora) => <div className="hora">{hora.name}</div>)}
            </div>
        </div>
    )
}
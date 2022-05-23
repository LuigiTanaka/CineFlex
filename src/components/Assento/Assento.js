import "./style-assento.css";

function selecionaAssento(index, assentos, setAssentos) {
    assentos[index].selecionado = !assentos[index].selecionado;
    const newAssentos = [...assentos];
    setAssentos(newAssentos);
}

export default function Assento({ index, numero, disponivel, selecionado, assentos, setAssentos }) {
    if (!disponivel) {
        return (
            <div className="assento ocupado" onClick={() => alert("Esse assento não está disponível")}>
                <h6>{numero}</h6>
            </div>
        )
    } else if (disponivel && !selecionado) {
        return (
            <div className="assento disponivel" onClick={() => selecionaAssento(index, assentos, setAssentos)}>
                <h6>{numero}</h6>
            </div>
        )
    } else if (disponivel && selecionado) {
        return (
            <div className="assento selecionado" onClick={() => selecionaAssento(index, assentos, setAssentos)}>
                <h6>{numero}</h6>
            </div>
        ) 
    }
}

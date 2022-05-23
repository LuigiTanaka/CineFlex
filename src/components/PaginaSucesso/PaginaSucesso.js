import { Link } from "react-router-dom";
import "./style-pagina-sucesso.css";

export default function PaginaSucesso( {dadosSucesso} ) {
    return (
        <div className="pagina-4">
            <div className="topo">
                <h1>CINEFLEX</h1>
            </div>
            <p>Pedido feito com sucesso!</p>
            <div className="informacoes">
                <div>
                    <h2>Filme e sessão</h2>
                    <h3>{dadosSucesso.titulo}</h3>
                    <h3>{dadosSucesso.data} {dadosSucesso.horario}</h3>
                </div>
                <div>
                    <h2>Ingressos</h2>
                    {dadosSucesso.assentos.map(assento => <h3>{`Assento ${assento}`}</h3>)}
                </div>
                <div>
                    <h2>Comprador</h2>
                    <h3>Nome: {dadosSucesso.nome}</h3>
                    <h3>CPF: {dadosSucesso.cpf}</h3>
                </div>
            </div>
            <Link to={"/"}>
                <button>Voltar pra Home</button>
            </Link>
        </div>
    )
}
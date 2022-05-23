import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Rodape from "../Rodape/Rodape";
import Assento from "../Assento/Assento";
import "./style-pagina-sessoes.css";

function criaAssentos(array, setAssentos) {
    let assentosAux = array.map(assento => {
        return {
            ...assento,
            selecionado: false
        }
    })

    setAssentos(assentosAux);
}

export default function PaginaSessoes({ dadosSucesso, setDadosSucesso }) {
    const { idSessao } = useParams();
    const [dadosSessao, setDadosSessao] = React.useState({});
    const [erro, setErro] = React.useState(false);
    const [assentos, setAssentos] = React.useState([]);
    const [nome, setNome] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const navigate = useNavigate();
    const assentosSelecionados = assentos.filter((assento) => assento.selecionado);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then((response) => {
            setDadosSessao({ ...response.data })
            criaAssentos([...response.data.seats], setAssentos);
            setDadosSucesso({titulo: response.data.movie.title, data: response.data.day.date, horario: response.data.name})
        })
            .catch((response) => {
                setErro(true);
            });
    }, [])

    function submitForm(event) {
        event.preventDefault();
        if(assentosSelecionados.length === 0) {
            alert('escolha pelo menos um assento'); 
        } else {
            const idsAssentos = [];
            const numAssentos = []
            assentosSelecionados.map((assentoSelecionado) => {
                idsAssentos.push(assentoSelecionado.id);
                numAssentos.push(assentoSelecionado.name);
            }
            );

            const dadosAssentos = {
                ids: idsAssentos,
                name: nome,
                cpf: cpf
            }

            axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", dadosAssentos);

            setDadosSucesso({ ...dadosSucesso, nome: nome, cpf: cpf, assentos: numAssentos})
            navigate("/sucesso");
        }     
    }

    return (
        <div className="pagina-3">
            <div className="topo">
                <h1>CINEFLEX</h1>
            </div>
            <p>Selecione o(s) assento(s)</p>

            <div className="assentos">
                {!assentos ?
                    <div className="loading">
                        <h6>loading...</h6>
                    </div>
                    :
                    assentos.map((assento, index) => <Assento key={index} index={index} numero={assento.name} disponivel={assento.isAvailable} selecionado={assento.selecionado} assentos={assentos} setAssentos={setAssentos} />)
                }
            </div>

            <div className="legenda">
                <div>
                    <div className="assento selecionado"></div>
                    <h4>Selecionado</h4>
                </div>
                <div>
                    <div className="assento disponivel"></div>
                    <h4>Disponível</h4>
                </div>
                <div>
                    <div className="assento ocupado"></div>
                    <h4>Indisponível</h4>
                </div>
            </div>

            <form onSubmit={submitForm} className="forms">
                <label htmlFor="formName">Nome do comprador:</label>
                <input
                    id="formName"
                    type="text"
                    name="nome"
                    placeholder="Digite seu nome..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label htmlFor="formCPF">CPF do comprador:</label>
                <input
                    id="formCPF"
                    type="text"
                    name="cpf"
                    placeholder="Digite seu CPF..."
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                />
                {}
                <button type="submit">Reservar assento(s)</button>
            </form>

            {!dadosSessao.movie ?
                <div className="loading">
                    <h6>loading...</h6>
                </div>
                :
                <Rodape>
                    <img src={dadosSessao.movie.posterURL} alt="" />
                    <div>
                        <h2>{dadosSessao.movie.title}</h2>
                        <h2>{dadosSessao.day.weekday} - {dadosSessao.name}</h2>
                    </div>
                </Rodape>
            }
            {!erro ? null : "deu ruim"}
        </div>
    )
}
import React from "react";
import { useParams } from "react-router-dom";
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

export default function PaginaSessoes() {
    const { idSessao } = useParams();
    const [dadosSessao, setDadosSessao] = React.useState({});
    const [erro, setErro] = React.useState(false);
    const [assentos, setAssentos] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);
        promise.then((response) => {
            setDadosSessao({ ...response.data })
            criaAssentos([...response.data.seats], setAssentos);
        })
            .catch((response) => {
                setErro(true);
            });
    }, [])

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
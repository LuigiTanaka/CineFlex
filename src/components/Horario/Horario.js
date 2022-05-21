import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style-horario.css";
import Sessao from "../Sessao/Sessao";


export default function Horario() {
    const { idFilme } = useParams();
    const [dadosSessao, setDadosSessao] = React.useState({});
    const [erro, setErro] = React.useState(false);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then((response) => {
            setDadosSessao({ ...response.data })
        })
        .catch((response) => {
            setErro(true);
        });
    }, [])

    return (
        <div className="pagina-2">
            <div className="topo">
                <h1>CINEFLEX</h1>
            </div>
            <p>Selecione o horário</p>
            <div className="sessoes">
                {!dadosSessao.days && !erro ?
                    <div className="loading">
                        <h6>loading...</h6>
                    </div>
                    :
                    dadosSessao.days.map((dia, index) => <Sessao key={index} diaSemana={dia.weekday} data={dia.date} horarios={dia.showtimes} />)
                }
                {!erro ? null : "deu ruim"}
            </div>
            <div className="rodape">
                <img src={dadosSessao.posterURL} alt="" />
                <h2>{dadosSessao.title}</h2>
            </div>
        </div>
    )
}
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style-horario.css";
import Sessao from "../Sessao/Sessao";
import Rodape from "../Rodape/Rodape";


export default function Horario() {
    const { idFilme } = useParams();
    const [dadosHorario, setDadosHorario] = React.useState({});
    const [erro, setErro] = React.useState(false);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);
        promise.then((response) => {
            setDadosHorario({ ...response.data })
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
                {!dadosHorario.days && !erro ?
                    <div className="loading">
                        <h6>loading...</h6>
                    </div>
                    :
                    dadosHorario.days.map((dia, index) => <Sessao key={index} diaSemana={dia.weekday} data={dia.date} horarios={dia.showtimes} />)
                }
                {!erro ? null : "deu ruim"}
            </div>
            <Rodape>
                <img src={dadosHorario.posterURL} alt="" />
                <h2>{dadosHorario.title}</h2>
            </Rodape>
        </div>
    )
}
import React from "react";
import axios from "axios";
import "./style-pagina-inicial.css";
import PosterFilmes from "../PosterFilmes/PosterFilmes";

export default function PaginaInicial() {

    const [filmes, setFilmes] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');
        promise.then(response => setFilmes([...response.data]))
    }, []);

    return (
        <div className="pagina-1">
            <div className="topo">
                <h1>CINEFLEX</h1>
            </div>
            <p>Selecione o filme</p>
            <div className="poster-filmes">
                {filmes.map((filme, index) => <PosterFilmes key={index} url={filme.posterURL} id={filme.id}/>)}
            </div>
        </div>
    )
}
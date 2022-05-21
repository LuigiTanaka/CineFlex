import { Link} from "react-router-dom";
import "./style-poster-filmes.css";

export default function PosterFilmes( {url, id} ) {
    return (
        <Link to={`/filme/${id}`} >
            <img src={url} alt="" />
        </Link>
    )
}
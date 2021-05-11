import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  //Avaliações || Fonte || Valor || Tempo de execução
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;  
}

interface SelectProps {
  select: number
}


export function Content(props: SelectProps) {
  const [ movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(()=>{
    api.get<MovieProps[]>(`movies/?Genre_id=${props.select}`).then(response => {
      setMovies(response.data)
    });

    api.get<GenreResponseProps>(`genres/${props.select}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.select])

  return(
    <div className="container">
        <header>
          <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
  )
}
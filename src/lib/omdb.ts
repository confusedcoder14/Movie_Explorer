import { type SearchResult, type MovieDetails } from "@/types";
console.log('VITE ENV:', import.meta.env);
const API_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

if (!API_KEY) {
    throw new Error('VITE_OMDB_API_KEY is not defined in your environment variables. Please add it to your .env file.');
}

export async function searchMovies(query: string, page: number = 1): Promise<SearchResult> {
    const response = await fetch(`${API_URL}?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: SearchResult = await response.json();
    return data;
}

export async function getMovieDetails(imdbID: string): Promise<MovieDetails> {
    const response = await fetch(`${API_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
     if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: MovieDetails = await response.json();
    if(data.Response === 'False') {
        throw new Error("Movie not found.");
    }
    return data;
}

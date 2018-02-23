import React from 'react'
import PropTypes from 'prop-types'
import ReactStars from 'react-stars'
import SpinnerMovie from './SpinnerMovie'
import Similar from './Similar'
import Trailers from './Trailers'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'




const MovieView = ({movie, cast, crew, isLoading, language})=>{
	const genres = movie.genres.map((item)=>{
				return item.name
	})

	const countries = movie.production_countries.map((country)=>{
		return country.name
	})

	const actorsFull = cast.map((actor)=>{
		return actor.name
	})

	const director = crew[0] ? crew[0].name : "n/d";

	const actorsImages = cast.slice(0,7).map((actor)=>{
		return <div className="actor-w92-wrap" key={actor.id + Math.random()}>
		<Link to={`/actors/${actor.id}`}>
		<Img src={[`https://image.tmdb.org/t/p/w92/${actor.profile_path}`, dummyImg_92]} />
		</Link>
		<div className="actor-w92-name">{actor.name}</div>
		</div>
	})

	const actors = actorsFull.slice(0,6)
	console.log('Genres: ', genres)
	if(isLoading){
		return(
			<div className="movie-page-main">
				<div className="movie-page-col-1">
				<SpinnerMovie />
				</div>
				<div className="movie-page-col-2">
				<h1>Sidebar</h1>
				Sidebar will be here or not...
				</div>	
			</div>
		)
	} 

	return(
		<div className="movie-page-main">
			<div className="movie-page-col-1">

				<h1>{movie.title}</h1>
				<div className="movie-page-poster">
					<img src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}/>
				</div>

				<div className="movie-page-info">
					
					 
					<div className="movie-page-info-item">
						<b>Rating:</b> {movie.vote_average}
						<ReactStars
						  count={10}
						  value={movie.vote_average}
						  edit={false}
						  size={24}
						  color2={'#E6CF34'} 
						 />
					</div>
					{/*<div className="movie-page-info-item">
						<b>Vote Count:</b> {movie.vote_count}
					</div>*/}
					<div className="movie-page-info-item">
						<b>Director:</b> {director}
					</div> 
					
					<div className="movie-page-info-item">
						<b>Release Date:</b> {movie.release_date}
					</div>
					<div className="movie-page-info-item">
						<b>Country:</b> {countries.join(', ')}
					</div> 
					<p><b>Genre:</b> {genres.join(', ')}</p>
					<div className="movie-page-info-item">
						<b>Actors:</b> {actors.join(', ')}
					</div> 
					<div className="movie-page-info-item">
						<b>Runtime:</b> {movie.runtime} min
					</div>
					<div className="search-outside">
						<a href={`https://solarmoviex.to/search?keyword=${movie.original_title}`} target="_blank">Search The Movie</a>
					</div>
					 
				</div>
				<div className="actors-container">
					{/*<h2>Starring</h2>*/}
					{actorsImages}
				</div>
				<div className="movie-page-overview">
					<h2>Overview</h2>
					<p>{movie.overview}</p>
				</div>
				<div className="movie-page-backdrop">	
					<img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` : ""}/>
				</div>
				<Trailers 
					movieId={movie.id}
					language={language}
				/>
			</div>
			<div className="movie-page-col-2">
					<h1>Similar</h1>
					<Similar 
						movieId={movie.id}
						language={language}
					/>
			</div>		
		</div>
	)
}

MovieView.propTypes = {
	movie: PropTypes.object,
	cast: PropTypes.array
}


export default MovieView;
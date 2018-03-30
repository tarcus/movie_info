import React from 'react'
import ReactStars from 'react-stars'
import Spinner from './Spinner'
import Similar from './Similar'
import Trailers from './Trailers'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'
import dummyImg_342 from '../images/dummy_342.png'
import AddToWatchList from './AddToWatchList'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	movie_similar: {
		id: 'movieview.similar',
		defaultMessage: 'Similar'
	},
	movie_rating: {
		id: 'movieview.rating',
		defaultMessage: 'Rating'
	},
	movie_director: {
		id: 'movieview.director',
		defaultMessage: 'Director'
	},
	movie_release_date: {
		id: 'movieview.release_date',
		defaultMessage: 'Release Date'
	},
	movie_country: {
		id: 'movieview.country',
		defaultMessage: 'Country'
	},
	movie_genre: {
		id: 'movieview.genre',
		defaultMessage: 'Genre'
	},
	movie_actors: {
		id: 'movieview.actors',
		defaultMessage: 'Actors'
	},
	movie_runtime: {
		id: 'movieview.runtime',
		defaultMessage: 'Runtime'
	},
	movie_runtime_min: {
		id: 'movieview.runtime_min',
		defaultMessage: 'min.'
	},
	movie_starring: {
		id: 'movieview.starring',
		defaultMessage: 'Starring'
	},
	movie_overview: {
		id: 'movieview.overview',
		defaultMessage: 'Overview'
	},
	trailers_heading: {
		id: 'trailers.heading',
		defaultMessage: 'Trailer'
	},
}) 


const MovieView = ({intl, movie, cast, crew, isLoading, language})=>{
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
	
	if(isLoading){
		return(
			<div className="movie-page-main">
				<div className="movie-page-col-1">
				<Spinner />
				</div>
				<div className="movie-page-col-2">
				<h1>{intl.formatMessage(messages.movie_similar)}</h1>
				
				</div>	
			</div>
		)
	} 

	return(
		<div className="movie-page-main">
			<div className="movie-page-col-1">

				<h1>{movie.title}</h1>
				<div className="movie-page-poster">
					<Img src={[`https://image.tmdb.org/t/p/w342/${movie.poster_path}`, dummyImg_342]} loader={<Spinner />} />
				</div>

				<div className="movie-page-info">
					
					 
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_rating)}:</b> {movie.vote_average}
						<ReactStars
						  count={10}
						  value={movie.vote_average}
						  edit={false}
						  size={24}
						  color2={'#E6CF34'} 
						 />
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_director)}:</b> {director}
					</div> 
					
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_release_date)}:</b> {movie.release_date}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_country)}:</b> {countries.join(', ')}
					</div> 
					<p><b>{intl.formatMessage(messages.movie_genre)}:</b> {genres.join(', ')}</p>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_actors)}:</b> {actors.join(', ')}
					</div> 
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.movie_runtime)}:</b> {movie.runtime} {intl.formatMessage(messages.movie_runtime_min)}
					</div>
					 <AddToWatchList movie={movie}/>
				</div>
				<div className="actors-container">
					<h2>{intl.formatMessage(messages.movie_starring)}</h2>
					{actorsImages}
				</div>
				<div className="movie-page-overview">
					<h2>{intl.formatMessage(messages.movie_overview)}</h2>
					<p>{movie.overview}</p>

				</div>
				<div className="movie-page-backdrop">	
					<img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` : ""}/>
				</div>
				<Trailers
					heading={intl.formatMessage(messages.trailers_heading)} 
					mediaType={'movie'}
					movieId={movie.id}
					language={language}
				/>
			</div>
			<div className="movie-page-col-2">
					<h1>{intl.formatMessage(messages.movie_similar)}</h1>
					<Similar 
						mediaType={'movie'}
						movieId={movie.id}
						language={language}
					/>
			</div>		
		</div>
	)
}




export default injectIntl(MovieView);
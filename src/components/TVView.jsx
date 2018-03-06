import React from 'react'
import ReactStars from 'react-stars'
import Spinner from './Spinner'
import Similar from './Similar'
import Trailers from './Trailers'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'


const TVView = ({tv, cast, isLoading, language})=>{
	const genres = tv.genres.map((item)=>{
				return item.name
	})

	const countries = tv.origin_country.map((country)=>{
		return country
	})

	const actorsFull = cast.map((actor)=>{
		return actor.name
	})

	
	const createdBy = tv.created_by.map((item)=>{
		return item.name
	})
	

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
				<h1>Similar</h1>
				
				</div>	
			</div>
		)
	} 

	return(
		<div className="movie-page-main">
			<div className="movie-page-col-1">

				<h1>{tv.name}</h1>
				<div className="movie-page-poster">
					<img src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`}/>
				</div>

				<div className="movie-page-info">
					
					 
					<div className="movie-page-info-item">
						<b>Rating:</b> {tv.vote_average}
						<ReactStars
						  count={10}
						  value={tv.vote_average}
						  edit={false}
						  size={24}
						  color2={'#E6CF34'} 
						 />
					</div>
					<div className="movie-page-info-item">
						<b>Created by:</b> {createdBy.join(', ')}
					</div> 
					
					<div className="movie-page-info-item">
						<b>Release Date:</b> {tv.first_air_date}
					</div>
					<div className="movie-page-info-item">
						<b>Country:</b> {countries.join(', ')}
					</div> 
					<p><b>Genre:</b> {genres.join(', ')}</p>
					<div className="movie-page-info-item">
						<b>Number of Seasons:</b> {tv.number_of_seasons}
					</div>
					<div className="movie-page-info-item">
						<b>Number of Episodes:</b> {tv.number_of_episodes}
					</div>
					<div className="movie-page-info-item">
						<b>Last Air Date:</b> {tv.last_air_date}
					</div>
					<div className="movie-page-info-item">
						<b>Status:</b> {tv.status}
					</div>
					<div className="movie-page-info-item">
						<b>Actors:</b> {actors.join(', ')}
					</div> 
					<div className="movie-page-info-item">
						<b>Runtime:</b> {tv.episode_run_time[0]} min
					</div>
					<div className="search-outside">
						<a href={`https://solarmoviex.to/search?keyword=${tv.original_name}`} target="_blank">Search The Show</a>
					</div>
					 
				</div>
				<div className="actors-container">
					<h2>Starring</h2>
					{actorsImages}
				</div>
				<div className="movie-page-overview">
					<h2>Overview</h2>
					<p>{tv.overview}</p>
				</div>
				<div className="movie-page-backdrop">	
					<img src={tv.backdrop_path ? `https://image.tmdb.org/t/p/w780/${tv.backdrop_path}` : ""}/>
				</div>
				<Trailers
					mediaType={'tv'} 
					movieId={tv.id}
					language={language}
				/>
			</div>
			<div className="movie-page-col-2">
					<h1>Similar</h1>
					<Similar 
						mediaType={'tv'}
						movieId={tv.id}
						language={language}
					/>
			</div>		
		</div>
	)
}




export default TVView;
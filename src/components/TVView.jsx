import React from 'react'
import ReactStars from 'react-stars'
import Spinner from './Spinner'
import Similar from './Similar'
import Trailers from './Trailers'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'
import dummyImg_342 from '../images/dummy_342.png'
import {defineMessages, injectIntl} from 'react-intl'
import AddToWatchListTv from './AddToWatchListTv'

//i18n
const messages = defineMessages({
	tv_similar: {
		id: 'tv.similar',
		defaultMessage: 'Similar'
	},
	tv_rating: {
		id: 'tvview.rating',
		defaultMessage: 'Rating'
	},
	tv_director: {
		id: 'tvview.director',
		defaultMessage: 'Created by'
	},
	tv_release_date: {
		id: 'tvview.release_date',
		defaultMessage: 'First Air Date'
	},
	tv_country: {
		id: 'tvview.country',
		defaultMessage: 'Country'
	},
	tv_genre: {
		id: 'tvview.genre',
		defaultMessage: 'Genre'
	},
	tv_actors: {
		id: 'tvview.actors',
		defaultMessage: 'Actors'
	},
	tv_runtime: {
		id: 'tvview.runtime',
		defaultMessage: 'Runtime'
	},
	tv_runtime_min: {
		id: 'tvview.runtime_min',
		defaultMessage: 'min.'
	},
	tv_starring: {
		id: 'tvview.starring',
		defaultMessage: 'Starring'
	},
	tv_overview: {
		id: 'tvview.overview',
		defaultMessage: 'Overview'
	},
	tv_number_of_seasons: {
		id: 'tvview.number_of_seasons',
		defaultMessage: 'Number of Seasons'
	},
	tv_number_of_episodes: {
		id: 'tvview.number_of_episodes',
		defaultMessage: 'Number of Episodes'
	},
	tv_last_air_date: {
		id: 'tvview.last_air_date',
		defaultMessage: 'Last Air Date'
	},
	tv_status: {
		id: 'tvview.status',
		defaultMessage: 'Status'
	},
	tv_trailers_heading: {
		id: 'tvview.trailers_heading',
		defaultMessage: 'Trailer'
	},
}) 


const TVView = ({intl, tv, cast, isLoading, language})=>{
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
	
	const tvStatusRu = ()=>{
		switch(tv.status){
			case 'Returning Series':
			return 'Продолжение следует'
			break;
			case 'Ended':
			return 'Завершён'
			break;
			case 'Canceled':
			return 'Отменён'
		}
	}

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
				<h1>{intl.formatMessage(messages.tv_similar)}</h1>
				
				</div>	
			</div>
		)
	} 

	return(
		<div className="movie-page-main">
			<div className="movie-page-col-1">

				<h1>{tv.name}</h1>
				<div className="movie-page-poster">
					<Img src={[`https://image.tmdb.org/t/p/w342/${tv.poster_path}`, dummyImg_342]} loader={<Spinner />}/>
				</div>

				<div className="movie-page-info">
					
					 
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_rating)}:</b> {tv.vote_average}
						<ReactStars
						  count={10}
						  value={tv.vote_average}
						  edit={false}
						  size={24}
						  color2={'#FFCC00'} 
						 />
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_director)}:</b> {createdBy.join(', ')}
					</div> 
					
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_release_date)}:</b> {tv.first_air_date}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_country)}:</b> {countries.join(', ')}
					</div> 
					<p><b>{intl.formatMessage(messages.tv_genre)}:</b> {genres.join(', ')}</p>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_number_of_seasons)}:</b> {tv.number_of_seasons}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_number_of_episodes)}:</b> {tv.number_of_episodes}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_last_air_date)}:</b> {tv.last_air_date}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_status)}:</b> {language=='ru' ? tvStatusRu() : tv.status}
					</div>
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_actors)}:</b> {actors.join(', ')}
					</div> 
					<div className="movie-page-info-item">
						<b>{intl.formatMessage(messages.tv_runtime)}:</b> {tv.episode_run_time[0]} {intl.formatMessage(messages.tv_runtime_min)}
					</div>
					<AddToWatchListTv tv={tv}/>	 
				</div>
				<div className="actors-container">
					<h2>{intl.formatMessage(messages.tv_starring)}</h2>
					{actorsImages}
				</div>
				<div className="movie-page-overview">
					<h2>{intl.formatMessage(messages.tv_overview)}</h2>
					<p>{tv.overview}</p>
				</div>
				<div className="movie-page-backdrop">	
					<img src={tv.backdrop_path ? `https://image.tmdb.org/t/p/w780/${tv.backdrop_path}` : ""}/>
				</div>
				<Trailers
					heading={intl.formatMessage(messages.tv_trailers_heading)}
					mediaType={'tv'} 
					movieId={tv.id}
					language={language}
				/>
			</div>
			<div className="movie-page-col-2">
					<h1>{intl.formatMessage(messages.tv_similar)}</h1>
					<Similar 
						mediaType={'tv'}
						movieId={tv.id}
						language={language}
					/>
			</div>		
		</div>
	)
}




export default injectIntl(TVView);
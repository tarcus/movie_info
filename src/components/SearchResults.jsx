import React from 'react';
//import FullMovieInfo from './FullMovieInfo';
import Spinner from './Spinner'
import { defineMessages, FormattedMessage, injectIntl} from 'react-intl'

const messages = defineMessages({
	imdbRating: {
		id: 'searchResults.imdbRating',
		defaultMessage: 'IMDB Rating'
	},
	director: {
		id: 'searchResults.director',
		defaultMessage: 'Director'
	},
	genre: {
		id: 'searchResults.genre',
		defaultMessage: 'Genre'
	},
	country: {
		id: 'searchResults.country',
		defaultMessage: 'Country'
	},
	runtime: {
		id: 'searchResults.runtime',
		defaultMessage: 'Runtime'
	},
	released: {
		id: 'searchResults.released',
		defaultMessage: 'Released'
	},
	actors: {
		id: 'searchResults.actors',
		defaultMessage: 'Actors'
	},
	plot: {
		id: 'searchResults.plot',
		defaultMessage: 'Plot'
	},
	movie_not_found: {
		id: 'searchResults.movie_not_found',
		defaultMessage: 'Movie Not Found, Sorry...'
	},
	try_another: {
		id: 'searchResults.try_another',
		defaultMessage: 'Try Another One'
	}
})

const SearchResults = ({mov, isLoading, intl})=>{
	//Если запрос отправлен, то показываем спинер
	 if(isLoading){
	 	return(
	 		<div className="col-1">
	 			<Spinner />
	 		</div>
	 	)

	//если фильм не найден
	} else if(mov.Error){
		return (
			<div className="col-1">
				<div className="row-nowrap"><h1 className="mov-heading">{intl.formatMessage(messages.movie_not_found)}</h1></div>
				<p>{intl.formatMessage(messages.try_another)}</p>
			</div>
		)
	} else if(!mov.Title){
		return (
			<div className="col-1">
				<div className="row-nowrap">
					<h1 className="mov-heading">
						<FormattedMessage 
							id='searchResults.lets_heading'
							defaultMessage="Let's Find Something Interesting!"
							description="Lets find movie CTA"
						/>
					</h1>
				</div>
			</div>
		)
	} else {
		return (
		<div className="col-1">
			<h1 className="mov-heading">{mov.Title}<span className="year">{`(${mov.Year})`}</span></h1>
			
			<div className="row-no-justify">
				<div className="big-info-container">
					
					<div className="poster">
						<img src={mov.Poster}/>
					</div>
				</div>
				<div className="small-info-container">
					<div className="imdb-rating small-info-item">
						<span><b>{intl.formatMessage(messages.imdbRating)}:</b> {mov.imdbRating}</span>
					</div>
					
					<div className="director small-info-item">
						<span><b>{intl.formatMessage(messages.director)}:</b> {mov.Director}</span>
					</div>
					<div className="genre small-info-item">
						<span><b>{intl.formatMessage(messages.genre)}:</b> {mov.Genre}</span>
					</div>
					<div className="country small-info-item">
						<span><b>{intl.formatMessage(messages.country)}:</b> {mov.Country}</span>
					</div>
					<div className="runtime small-info-item">
						<span><b>{intl.formatMessage(messages.runtime)}:</b> {mov.Runtime}</span>
					</div>
					<div className="released small-info-item">
						<span><b>{intl.formatMessage(messages.released)}:</b> {mov.Released}</span>
					</div>
					<div className="actors small-info-item">
						<span><b>{intl.formatMessage(messages.actors)}:</b> {mov.Actors}</span>
					</div>
				</div>
				<div className="plot">
					<h2>{intl.formatMessage(messages.plot)}</h2>
					<p>{mov.Plot}</p>
				</div>	
			</div>
				
		</div>
		)
	}
	
}

export default injectIntl(SearchResults);
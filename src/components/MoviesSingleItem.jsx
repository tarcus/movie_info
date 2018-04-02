import React from 'react'
import ReactStars from 'react-stars'
import Truncate from 'react-truncate'
import {Link} from 'react-router-dom'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	moviessingleitem_year: {
		id: 'moviessingleitem.year',
		defaultMessage: 'Year'
	},
	moviessingleitem_rating: {
		id: 'moviessingleitem.rating',
		defaultMessage: 'Rating'
	},
	moviessingleitem_read_more: {
		id: 'moviessingleitem.read_more',
		defaultMessage: 'Read More'
	}
}) 

const MoviesSingleItem = ({intl, data})=>{
	return(
		<div className="single-movie-card">
			<div className="single-movie-card-poster">
				<img src={`https://image.tmdb.org/t/p/w185/${data.poster_path}`}/>
			</div>
			<div className="single-movie-card-info">
				<h2>{data.title ? data.title : data.name}</h2>
				<div><b>{intl.formatMessage(messages.moviessingleitem_year)}:</b> {data.release_date ? data.release_date.slice(0, 4) : data.first_air_date}</div>
				<div className="single-movie-card-rating">
					<b>{intl.formatMessage(messages.moviessingleitem_rating)}:</b> {data.vote_average}
					<div className="stars-rating">
					<ReactStars
					  count={10}
					  value={data.vote_average}
					  edit={false}
					  size={24}
					  half={false}
					  color2={'#E6CF34'} 
					 />
					</div>	
				</div>
				<div className="single-movie-card-plot">
					<Truncate lines={3} ellipsis={<span>...</span>}>
						{data.overview}
					</Truncate>
				</div>
				<div className="single-movie-card-read-more">
					<Link to={`/${data.title ? 'movies' : 'series'}/${data.id}`}>{intl.formatMessage(messages.moviessingleitem_read_more)}</Link>
				</div>
			</div>
		</div>
	)
}

export default injectIntl(MoviesSingleItem);
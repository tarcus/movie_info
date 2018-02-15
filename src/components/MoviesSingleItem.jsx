import React from 'react'
import ReactStars from 'react-stars'
import Truncate from 'react-truncate'
import {Link} from 'react-router-dom'

const MoviesSingleItem = ({data})=>{
	return(
		<div className="single-movie-card">
			<div className="single-movie-card-poster">
				<img src={`https://image.tmdb.org/t/p/w185/${data.poster_path}`}/>
			</div>
			<div className="single-movie-card-info">
				<h2>{data.title}</h2>
				<div><b>Year:</b> {data.release_date.slice(0, 4)}</div>
				<div className="single-movie-card-rating">
					<b>Rating:</b> {data.vote_average}
					<ReactStars
					  count={10}
					  value={data.vote_average}
					  edit={false}
					  size={24}
					  color2={'#E6CF34'} 
					 />
				</div>
				<div className="single-movie-card-plot">
					<Truncate lines={3} ellipsis={<span>...</span>}>
						{data.overview}
					</Truncate>
				</div>
				<div className="single-movie-card-read-more">
					<Link to={`/movies/${data.id}`}>Read More</Link>
				</div>
			</div>
		</div>
	)
}

export default MoviesSingleItem;
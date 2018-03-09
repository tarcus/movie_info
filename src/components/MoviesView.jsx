import React from 'react'
import MoviesSingleItem from './MoviesSingleItem'

const MoviesView = ({movies})=>{
	console.log('Movies: ',movies)
	return(
		<div className="movies-view-container row">
			{movies.map((movie)=>{
				return <MoviesSingleItem key={movie.id}  data={movie} />
			})} 
		</div>
	)
}

export default MoviesView;
import React from 'react'

const FullMovieInfo = (props)=>{
	return(
		<div className="full-movie-info">
			<div><h1>{mov.Title}</h1></div>
			<div className="poster">
				<img src={mov.Poster}/>
			</div>
			<div className="plot">
				<h3>Plot</h3>
				<p>{mov.Plot}</p>
			</div>
		</div>
	)
}

export default FullMovieInfo;
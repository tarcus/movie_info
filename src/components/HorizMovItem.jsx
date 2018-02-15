import React from 'react';

const HorizMovItem = ({movie})=>{
	return(
		<div className="horiz-mov-item">
			<img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}/>
			
		</div>
	)
}

export default HorizMovItem;
import React from 'react'
import {Link} from 'react-router-dom'

const ActorCardW154 = ({data})=>{
	return(
		<div className="actor-w154-wrap">
				<Link to={`/actors/${data.id}`}>
				<img src={`https://image.tmdb.org/t/p/w154/${data.profile_path}`}/>
				</Link>
				<div className="actor-w154-name">
					{data.name}
				</div>
		</div>
	)
}
export default ActorCardW154;
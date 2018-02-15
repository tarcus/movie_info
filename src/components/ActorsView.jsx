import React from 'react'

const ActorsView = ({actor})=>{

	return(
		<div className="actors-view-container">
			Actor id {actor.id}
			{actor.birthday}
		</div>
	)
}

export default ActorsView;
import React from 'react'
import PeoplePop from './PeoplePop'

const ActorsAll = ()=>{
	return(
			<div className="home row">
				<div className="home-col-1">				
						<h1>Top Rated Actors</h1>
					<PeoplePop />			
				</div>	
			</div>
		)
}

export default ActorsAll;
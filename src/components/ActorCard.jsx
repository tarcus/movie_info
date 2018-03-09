import React from 'react'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'
import Spinner from './Spinner'
import Truncate from 'react-truncate'


const ActorCard = ({data})=>{
		const filtered = data.known_for.filter((item)=>{
			return  item 
		})
		var knownAs = filtered.map((item, i, arr)=>{
		return <p key={item.id}>{`${item.title} ${arr.length>(i+1) ? ", " : "." }`} </p>
		})
			

	const popularity = data.popularity.toString().slice(0, 3);
	
	return(
		<div className="actor-card-wrap row-nowrap">
			<div className="actor-card-img-wrap">
				<Link to={`/actors/${data.id}`}>
					<Img src={[`https://image.tmdb.org/t/p/w92/${data.profile_path}`,dummyImg_92]}
						 loader={<Spinner />}
					/>
				</Link>
			</div>
			<div className="actor-card-info">
				<h4>{data.name}</h4>
				<div className="actor-card-rating">
					<b>Popularity: </b> {popularity}	
				</div>
				
				
				<div className="actor-card-overview">
					<Truncate lines={2} ellipsis={<span>..</span>}>
						{knownAs} 
					</Truncate>
						
				</div>
				
				<div className="actor-card-more">
					<Link to={`/actors/${data.id}`}>Read More</Link>
				</div>
			</div>
		</div>
	)
}

export default ActorCard;
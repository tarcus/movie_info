import React from 'react'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'
import Spinner from './Spinner'
import Truncate from 'react-truncate'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	actorcard_popularity: {
		id: 'actorcard.popularity',
		defaultMessage: 'Popularity'
	},
	actorcard_known_for: {
		id: 'actorcard.known_for',
		defaultMessage: 'Known For'
	},
	actorcard_read_more: {
		id: 'actorcard.read_more',
		defaultMessage: 'Read More'
	}
}) 


const ActorCard = ({intl, data})=>{
		const filtered = data.known_for.filter((item)=>{
			return  item 
		})
		var knownAs = filtered.map((item, i, arr)=>{
		return <p key={item.id}>{`${item.title ? item.title : item.name+" (TV)"} ${arr.length>(i+1) ? ", " : "." }`} </p>
		})

		
	const popularity = data.popularity.toString().slice(0, 4);
	
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
					<b>{intl.formatMessage(messages.actorcard_popularity)}: </b> {popularity}	
				</div>
				
				<div className="actor-card-overview">
					<span className="known-for">{intl.formatMessage(messages.actorcard_known_for)}: </span>
					<Truncate lines={2} ellipsis={<span>..</span>}>
						{knownAs} 
					</Truncate>	
				</div>
				
				<div className="actor-card-more">
					<Link to={`/actors/${data.id}`}>{intl.formatMessage(messages.actorcard_read_more)}</Link>
				</div>
			</div>
		</div>
	)
}

export default injectIntl(ActorCard);
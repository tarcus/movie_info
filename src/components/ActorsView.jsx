import React from 'react'
import getAge from '../utils/getAge'
import {Link} from 'react-router-dom'
import {sliceDate} from '../utils/helpers'
import Img from 'react-image'
import dummyImg from '../images/dummy_185.png'
import Spinner from './Spinner'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	actorsview_birthday: {
		id: 'actorsview.birthday',
		defaultMessage: 'Birthday'
	},
	actorsview_age: {
		id: 'actorsview.age',
		defaultMessage: 'Age'
	},
	actorsview_place_of_birth: {
		id: 'actorsview.place_of_birth',
		defaultMessage: 'Place of Birth'
	},
	actorsview_filmography: {
		id: 'actorsview.filmography',
		defaultMessage: 'Filmography'
	}
}) 

const ActorsView = ({intl, actor})=>{
	//remove items without posters
	const filtered = actor.movie_credits.cast.filter((item)=>{
		return item.poster_path !==null;
	})
	const filmography = filtered.map((item)=>{
		return <div className="filmography-item" key={item.id + Math.random().toString().slice(-3)}>
					<Link to={`/movies/${item.id}`}>
						<Img src={[`https://image.tmdb.org/t/p/w185/${item.poster_path}`, dummyImg]}
							loader={<Spinner />}
						 />
					</Link>
					<span className="rating">{item.vote_average}</span>
					<span className="release">{sliceDate(item.release_date)}</span>
					<div className="overlay">
						<span className="overlay-title">{item.title}</span>
						
					</div>
			   </div>
	})
	
	return(
		<div className="actors-view-container">
			<h1>{actor.name}</h1>
			<div className="actor-info-wrap">
				<div className="actor-img-wrap">
				{actor.profile_path && <Img src={[`https://image.tmdb.org/t/p/w185/${actor.profile_path}`]} loader={<Spinner />} />}
				
				</div>
				<div className="actor-biography-wrap">
					<div className="actor-bio-item">
						<b>{intl.formatMessage(messages.actorsview_birthday)}:</b> {actor.birthday}	
					</div>
					<div className="actor-bio-item">
						<b>{intl.formatMessage(messages.actorsview_age)}:</b> {getAge(actor.birthday)}
					</div>
					<div className="actor-bio-item">
						<b>{intl.formatMessage(messages.actorsview_place_of_birth)}:</b> {actor.place_of_birth}
					</div>
					<div className="actor-bio">
						<p>
							{actor.biography}
						</p>
					</div>
				</div>
			</div>

			<div className="filmography-container row">
				<h2>{intl.formatMessage(messages.actorsview_filmography)}</h2>
				{filmography}
			</div>
		</div>
	)
}

export default injectIntl(ActorsView);
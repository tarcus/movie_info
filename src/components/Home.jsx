import React from 'react'
import HorizMovies from './HorizMovies'
import NowPlayingMov from './NowPlayingMov'
import AiringTodayTv from './AiringTodayTv'
import {defineMessages, injectIntl} from 'react-intl'
import UpcomingMov from './UpcomingMov'

const messages = defineMessages({
	home_h1: {
		id: 'home.h1',
		defaultMessage: 'Worth Watching'
	},
	airing_today_tv_h2: {
		id: 'airing_today_tv.h2',
		defaultMessage: 'Airing Today'
	}
}) 

const Home = (props)=>{
		return(
			<div className="home row">
				<div className="home-col-1">
					<div className="carousel-wrap">
						<h1>{props.intl.formatMessage(messages.home_h1)}</h1>
						<HorizMovies />
					</div>
					<div className="row now-playing-wrap">
						<NowPlayingMov	 
						movie={true}
					/>
					<NowPlayingMov 	
						movie={false}
					/>
					</div>
					<AiringTodayTv heading={props.intl.formatMessage(messages.airing_today_tv_h2)}/>
					<UpcomingMov heading='Upcoming' />
				</div>	
			</div>
		)
}

export default injectIntl(Home);
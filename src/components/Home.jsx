import React, {Component} from 'react'
import HorizMovies from './HorizMovies'
import NowPlayingMov from './NowPlayingMov'

class Home extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="home row">
				<div className="home-col-1">
					<div className="carousel-wrap">
						<h2>Worth Watching Movies</h2>
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
				</div>	
			</div>
		)
	}
}

export default Home;
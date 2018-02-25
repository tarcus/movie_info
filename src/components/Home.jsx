import React, {Component} from 'react'
import HorizMovies from './HorizMovies'
import NowPlayingMov from './NowPlayingMov'

class Home extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="home">
				<div className="carousel-wrap">
					<h2>Interesting</h2>
					<HorizMovies />
				</div>
				
				<NowPlayingMov 
					movie={true}
				/>
				<NowPlayingMov 
					movie={false}
				/>
			</div>
		)
	}
}

export default Home;
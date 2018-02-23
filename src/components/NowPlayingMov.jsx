import React, {Component} from 'react'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import axios from 'axios'

class NowPlayingMov extends Component {
	constructor(){
		super()

		this.state = {data: []}
	}

	getNowPlaying = ()=>{
		const options = {
			method: 'get',
			timeout: 4000,
			url: `${baseUrl}/movie/now_playing`,
			params: {
				language: this.props.intl.locale,
				api_key: api_key,
				page: 1//Math.floor((Math.random() * 10) + 1)
			}
		}


		axios(options)
		.then((response)=>{
			console.log(response.data);
			this.setState({data: response.data.results})})
		.catch((error)=>{
			console.log(error)
		})
	
	}


	componentDidMount(){
		this.getNowPlaying();
	}

	render(){
		const getRand = () =>{
			 const begin = Math.floor(Math.random() * 20);
			 const end = begin + 1;
			 return [begin, end]	
		}


		const bigImg = this.state.data.slice(...getRand()).map((item)=>{
					return <div className="big-img" key={item.id}>
								<img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}/>
								<div className="inside-wrap">
									<div className="poster-inside">
										<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
									</div>
									<span>{item.title}</span>
								</div>
								
						  </div>
		})


		


		return(
			<div className="now-playing-mov">
				<h2>Now Playing Movie</h2>

				
				<div className="now-playing-card row-no-justify">
					{bigImg}



					<div className="small-img">
						<img src="" />
					</div>
					<div className="small-img">
						<img src="" />
					</div>
					<div className="small-img">
						<img src="" />
					</div>
				</div>
				
				
			</div>
		)
	}

}

export default injectIntl(NowPlayingMov);
import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'
import {sliceDate} from '../utils/helpers'

class AiringTodayTv extends Component {
	constructor(props){
		super(props);
		this.state = {results: []}
	}

	getAiringToday = ()=>{
		const options = {	
			timeout: 3000,
			url: `${baseUrl}/tv/airing_today`,
			params: {
				api_key,
				language: this.props.intl.locale,
				page: 1	
			}
		}

		axios(options)
		.then((response)=>{
			//console.log('Airing Today: ',response.data)
			this.setState({results: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})	

	}

	
	componentDidMount(){
		this.getAiringToday();
	}

	render(){
		//сортируем по original language
		const sorted = this.state.results.filter((item)=>{
			return item.original_language=="en" && item.vote_average>=4 && item.poster_path !== null;
		})

		const today = sorted.slice(0, 10).map((item)=>{
			return <div className="filmography-item" key={item.id}>
				<Link to={`/series/${item.id}`}>
					<img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}/>
				</Link>
				<span className="rating">{item.vote_average}</span>
					<span className="release">{sliceDate(item.first_air_date)}</span>
					<div className="overlay">
						<span className="overlay-title">{item.name}</span>
						
					</div>
				
			</div>
		})
		return(
			<div className="airing-today-wrap row">
				<h2 className="w-100">{this.props.heading}</h2>
				{today}
			</div>
		)
	}
}

export default injectIntl(AiringTodayTv);

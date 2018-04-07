import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'
import {sliceDate, genKey} from '../utils/helpers'

class UpcomingMov extends Component {
	constructor(props){
		super(props);
		this.state = {results: []}
	}

	getUpcoming = ()=>{
		const options = {	
			timeout: 3000,
			url: `${baseUrl}/movie/upcoming`,
			params: {
				api_key,
				language: this.props.intl.locale,
				//region: 'US',
				page: 1	
			}
		}

		axios(options)
		.then((response)=>{
			//Make second request
			const res = [...response.data.results]
			axios({...options, ...{params: {api_key, language: this.props.intl.locale, page: 3}}})
			.then((response)=>{
				const combined = [...res, ...response.data.results]
				console.log('RES: ', combined)
				this.setState({results: combined})
			})
			.catch((error)=>{
				console.log(error)
			})
			//console.log('Airing Today: ',response.data)
			
		})
		.catch((error)=>{
			console.log(error)
		})	

	}

	
	componentDidMount(){
		this.getUpcoming();
	}

	render(){
		//сортируем по original language
		const sorted = this.state.results.filter((item)=>{
			return item.vote_average > 4.5
		})

		const today = sorted.slice(0, 25).map((item)=>{
			return <div className="filmography-item" key={genKey()}>
				<Link to={`/movies/${item.id}`}>
					<img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}/>
				</Link>
				<span className="rating">{item.vote_average}</span>
					<span className="release">{item.release_date}</span>
					<div className="overlay">
						<span className="overlay-title">{item.title}</span>
						
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

export default injectIntl(UpcomingMov);
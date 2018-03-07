import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'

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
			console.log('Airing Today: ',response.data)
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
			return item.original_language=="en";
		})

		const today = sorted.map((item)=>{
			return <div className="actor-w92-wrap" key={item.id}>
				<Link to={`/series/${item.id}`}>
					<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
				</Link>
				<div className="actor-w92-name">
					{item.name}
				</div>
			</div>
		})
		return(
			<div className="people-pop-wrap row">
				{today}
			</div>
		)
	}
}

export default injectIntl(AiringTodayTv);

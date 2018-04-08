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
		const lang = this.props.intl.locale
		const options = {	
			timeout: 3000,
			url: `${baseUrl}/movie/upcoming`,
			params: {
				api_key,
				language: lang,
				//region: 'RU',
				page: 1	
			}
		}
		
		const reqF = ()=>{
			return axios(options)
		}

		const reqS = ()=>{
			return axios({...options, ...{params: {api_key, language: lang, page: 2}}})
		}

		const reqT = ()=>{
			return axios({...options, ...{params: {api_key, language: lang, page: 3}}})
		}

		axios.all([reqF(), reqS(), reqT()])
		.then(axios.spread((resF, resS, resT)=>{
			//console.log(resF.data, resS.data, resT.data)
			const combined = [...resF.data.results, ...resS.data.results, ...resT.data.results]
			this.setState({results: combined})

		}))
		.catch((error)=>{
			console.log(error)
		})	
	}

	
	componentDidMount(){
		this.getUpcoming();
	}

	render(){
		const data = this.state.results;
		//API sometimes return duplicates, filter 
		const removeDuplicates = data.filter((item, i, arr)=>{
		    return arr.map(mapObj => mapObj.id).indexOf(item.id) === i
		})
		//console.log('REMOVE DUPL: ', removeDuplicates)
		
		//сортируем по original language
		const sorted = removeDuplicates.filter((item)=>{
			return item.vote_average > 4.5
		})

		const fresh = sorted.slice(0, 30).map((item)=>{
			return <div className="filmography-item" key={item.id}>
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
				{fresh}
			</div>
		)
	}
}

export default injectIntl(UpcomingMov);
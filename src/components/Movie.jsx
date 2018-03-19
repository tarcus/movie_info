import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import MovieView from './MovieView'
import {api_key, baseUrl} from '../options/apiOptions'



class Movie extends Component {
	constructor(props){
		super(props);

		this.state = {movie:{genres: [],
		 production_countries: []}, 
		 cast: [], 
		 crew: [], 
		 isLoading: true, 
		 movId: '' 
		}
	}

	getData = (movId)=>{
		//нужно сделать два запроса, сам фильм и список актеров
		const language = this.props.intl.locale;

		const optionsMain = {
			method: 'get',
			timeout: 3000,
			url: `${baseUrl}/movie/${movId}`,
			params: {
				api_key,
				language,	
			}
		}

		const optionsCredits = {
			method: 'get',
			timeout: 3000,
			url: `${baseUrl}/movie/${movId}/credits`,
			params: {
				language,
				api_key,
			}
		}

		const getMovie = ()=>{
			return axios(optionsMain)
		}

		const getCredits = ()=>{
			return axios(optionsCredits)
		}

		
		let reqInProgress = true;
		//console.log('ReqInProgress: ',reqInProgress)
		setTimeout(()=>{
			if(reqInProgress){
				this.setState({isLoading: true});
			}
			
		}, 200)


		axios.all([getMovie(), getCredits()])
		.then(axios.spread((mov, credits)=>{
			reqInProgress = false;
			this.setState({movie: mov.data, 
				cast: credits.data.cast, 
				crew: credits.data.crew, 
				isLoading: false, 
				movId: this.props.match.params.id
			})
		}))
		.catch((error)=>{
			reqInProgress = false;
			this.setState({isLoading: false})
			console.log(error)
		})
	}

	componentDidMount(){
		this.getData(this.props.match.params.id)
	}

	componentWillReceiveProps(nextProps){
		
		if(nextProps.match.params.id !==this.state.movId){
			this.getData(nextProps.match.params.id)
		}
		
	}

	

	render(){
		return(
			<div className="movie-page-container">
				<MovieView isLoading={this.state.isLoading}
				 cast={this.state.cast} 
				 movie={this.state.movie}
				 crew={this.state.crew}
				 language={this.props.intl.locale}
				 /> 	
			</div>
		)
	}
}

export default injectIntl(Movie);
import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import axios from 'axios'
//import MovieView from './MovieView'
import {api_key, baseUrl} from '../options/apiOptions'



class TV extends Component {
	constructor(props){
		super(props);

		this.state = {movie:{genres: [],
		 production_countries: []}, 
		 cast: [], 
		 crew: [], 
		 isLoading: true, 
		 tvId: '' 
		}
	}

	getData = (tvId)=>{
		//get TV and actors
		const language = this.props.intl.locale;
		const timeout = 3000;

		const optionsMain = {	
			timeout,
			url: `${baseUrl}/tv/${tvId}`,
			params: {
				api_key,
				language,	
			}
		}

		const optionsCredits = {	
			timeout,
			url: `${baseUrl}/tv/${tvId}/credits`,
			params: {
				api_key,
				language,
			}
		}

		const getMovie = ()=>{
			return axios(optionsMain)
		}

		const getCredits = ()=>{
			return axios(optionsCredits)
		}

		
		let reqInProgress = true;
		console.log('ReqInProgress: ',reqInProgress)
		setTimeout(()=>{
			if(reqInProgress){
				console.log('ReqInProgress inside timer: ', reqInProgress)
				this.setState({isLoading: true});
			}
			
		}, 200)


		axios.all([getMovie(), getCredits()])
		.then(axios.spread((mov, credits)=>{
			reqInProgress = false;
			console.log('TV: ', mov.data, 'TV Cast: ', credits.data)
			this.setState({movie: mov.data, 
				cast: credits.data.cast, 
				crew: credits.data.crew, 
				isLoading: false, 
				tvId: this.props.match.params.id
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
		
		if(nextProps.match.params.id !==this.state.tvId){
			this.getData(nextProps.match.params.id)
		}
		
	}

	

	render(){
		return(
			<div className="movie-page-container">
				{/*<MovieView isLoading={this.state.isLoading}
				 cast={this.state.cast} 
				 movie={this.state.movie}
				 crew={this.state.crew}
				 language={this.props.intl.locale}
				 /> 	*/}
			</div>
		)
	}
}

export default injectIntl(TV);
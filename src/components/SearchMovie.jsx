import React, {Component} from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';
import Sidebar from './Sidebar'
import FontAwesome from 'react-fontawesome'
import HorizMovies from './HorizMovies'
import { defineMessages, FormattedMessage, injectIntl} from 'react-intl'


class SearchMovie extends Component {
	constructor(props){
		super(props);
		this.state = {data: {Runtime:'initial'}, isLoading: false};
		
	}

	handleSubmit=(e)=>{
		e.preventDefault();
		
		//делаем задержку перед включением isLoading
		//чтобы не показывать спиннер на коротких запросах
		//начало запроса
		let reqInProgress = true;
		console.log('ReqInProgress: ',reqInProgress)
		setTimeout(()=>{
			if(reqInProgress){
				console.log('ReqInProgress inside timer: ', reqInProgress)
				this.setState({isLoading: true});
			}
			
		}, 200)
		
		// let movieName = this.MovieSearchInput.value;
		axios(`http://www.omdbapi.com/?apikey=4147a97e&t=${movieName}&plot=full`,{timeout: 2000})
		.then((response)=>{
			console.log(response.data)
			reqInProgress = false;
			this.setState((prevState)=>{
				return {data: response.data, isLoading: false}
			})
			this.MovieSearchInput.value = '';
		})
		.catch((error)=>{
			reqInProgress = false;
			this.setState({isLoading: false})
			console.log(error)
		})

	}
	

	render(){
		return(
			<div>
				{/*
				<div className="form-container">
					<form onSubmit={this.handleSubmit} className="search-movie-form row-nowrap">
						<input type="text" placeholder="Search for Movie..." autoFocus ref={(input)=>{this.MovieSearchInput=input}}/>
						<button type="submit"><FontAwesome name='search' size='2x' /></button>
					</form>
				</div>
				*/}
				<h2 className="horiz-mov-heading">
				<FormattedMessage
					id='searchMovie.horiz_mov_heading'
					defaultMessage="Most watched"
					description="Main carousel heading"
				 /></h2>
				<HorizMovies />
				<div className="row">
					<SearchResults mov={this.state.data} isLoading={this.state.isLoading}/>
					<Sidebar newItem={this.state.data} />
				</div>
				
			</div>
		)
	}
}

export default SearchMovie;
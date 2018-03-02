import React,{Component} from 'react'
//import {Link, withRouter} from 'react-router-dom'
import queryString from 'query-string'
import {injectIntl} from 'react-intl'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import {genresOptionsMovie, genresOptionsTV, getYearOptions, sortByTV, sortByMovies} from '../options/filterOptions'

class Filter extends Component {
	constructor(props){
		super(props);
	
		this.state = {	
				sort_by: 'popularity.desc',
				include_adult: false,
				include_video: false,
				page: 1,
				'vote_count.gte': 100,
				with_original_language: 'en',
				'primary_release_date.gte': '', // for Movies
				'first_air_date.gte': '',       //for TV first_air_date.gte 
				with_genres: '',			
		}
	}

	
	handleYear = (selectedOption)=>{
		//если сериал то...
		if(this.props.tv){
			this.setState({first_air_date_year: selectedOption==null ? "" : selectedOption}, ()=>{
				this.props.loadFiltered({params: this.state})
			})	
		} else {
			this.setState({year: selectedOption==null ? "" : selectedOption}, ()=>{
				this.props.loadFiltered({params: this.state})
			})	
		}
		
	}

	handleFromYear = (selectedOption)=>{
		//получаем из года Date
		let dateFromYear = new Date(selectedOption, 1,1,0,0,0,111);
		
		let isoDate = dateFromYear.toISOString().slice(0,10)

		//если сериал то...
		if(this.props.tv){
			this.setState({'first_air_date.gte': selectedOption==null ? "" : isoDate}, ()=>{
				this.props.loadFiltered({params: this.state})
			})	
		} else {
			this.setState({'primary_release_date.gte': selectedOption==null ? "" : isoDate}, ()=>{
				this.props.loadFiltered({params: this.state})
			})	

		}

		
	}

	handleGenre = (selectedOption)=>{
		this.setState({with_genres: selectedOption==null ? "" : selectedOption}, ()=>{ 
			this.props.loadFiltered({params: this.state}) 
		})
		
	}

	handleSort = (selectedOption)=>{
		this.setState({sort_by: selectedOption.value}, ()=>{
			this.props.loadFiltered({params: this.state})
		})
	}

	// handleOrigLang = (e)=>{
	// 	this.setState({with_original_language: (this.state.with_original_language !=="en") ? "en" : ""}, ()=>{
	// 		this.props.loadFiltered({params: this.state})
	// 	})
	// }
	componentDidMount(){
		//проверяем параметры запроса, если там есть что-то, то парсим параметры в объект
		//если параметров нет, возвращает пустой объект
		//если объект не пустой, то тянем то что в параметрах
		console.log('FILTER: ', "DID MOUNT")
		const paramsFromUrl = queryString.parse(location.search)
		console.log('PARAMS: ',paramsFromUrl)
		if(Object.keys(paramsFromUrl).length!==0){
			this.setState({paramsFromUrl})
			console.log('STATE: ', this.state)
			this.props.loadFiltered({params: paramsFromUrl})
		}


	}

	render(){
		const tv = this.props.tv; 
		return(
			<div className="movie-filter-container">
				<div className="movie-filter-inner-container">
					<div className="movie-filter-item">
						<h3>Genres</h3>
						<Select
				        name="genre"
				       	placeholder="Genres"
				        value={this.state.with_genres}
				        onChange={this.handleGenre}
				        options={tv ? genresOptionsTV : genresOptionsMovie}
						multi
						simpleValue
				     	/>
					</div>

					<div className="movie-filter-item">
						<h3>Year</h3>
						<Select
				        name="year"
				        placeholder="Year"
				        value={tv ? this.state.first_air_date_year : this.state.year}
				        onChange={this.handleYear}
				        options={getYearOptions(1975)}
				        simpleValue
				     	/>
					</div>

					<div className="movie-filter-item">
						<h3>Sort by</h3>
						<Select
				        name="sort"
				        value={this.state.sort_by}
				        onChange={this.handleSort}
				        options={tv ? sortByTV : sortByMovies}
				        clearable={false}

				     	/>
					</div>

					<div className="movie-filter-item">
						<h3>From Year</h3>
						<Select
				        name="fromYear"
				        placeholder="From Year"
				        value={ tv ? this.state['first_air_date.gte'].slice(0,4) : this.state['primary_release_date.gte'].slice(0,4)}
				        onChange={this.handleFromYear}
				        options={getYearOptions(1970)}
				        simpleValue
				     	/>
					</div>

					{/*<div className="movie-filter-item">
						<input type="checkbox"  onChange={this.handleOrigLang}/>
					</div>
					*/}
					
					
				</div>
								
			</div>
		)
	}
}

export default Filter;
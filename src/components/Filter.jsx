import React,{Component} from 'react'
import queryString from 'query-string'
import {injectIntl} from 'react-intl'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import {genresOptionsMovie, genresOptionsTV, getYearOptions, sortByTV, sortByMovies} from '../options/filterOptions'
import {withRouter} from 'react-router-dom'
import {sliceDate} from '../utils/helpers'
import merge from 'deepmerge'



class Filter extends Component {
	constructor(props){
		super(props);
	
		this.state = {	
			//	sort_by: 'popularity.desc',
			//	page: 1,
			//	'vote_count.gte': 50,
			//	with_original_language: 'en',
			//	'primary_release_date.gte': '', // for Movies
			//	'first_air_date.gte': '',       //for TV first_air_date.gte 
			//	with_genres: '',			
		}
	}

	
	

	//метод для пушинга параметров в URL при смене значения в фильтре
	pushParams = (paramFromFilter={})=>{
		const tv = this.props.tv;

		//v2
		//const stringified = queryString.stringify(this.state)
		//v3 stateless
		//нужно слить параметры из нескольких фильтров
		//Получаем параметры из URL
		const paramsFromUrl = queryString.parse(location.search);

		//set first page every time when filter opt changes
		const mergedOptions = merge.all([paramsFromUrl, paramFromFilter, {page: 1}])


		const stringified = queryString.stringify(mergedOptions)
		console.log('STRING: ', stringified)
		this.props.history.push(`/${tv ? 'series' : 'movies'}?${stringified}`)


	}


	parseUrlParams = ()=>{
		//проверяем параметры запроса, если там есть что-то, то парсим параметры в объект
		//если параметров нет, возвращает пустой объект
		//если объект не пустой, то тянем то что в параметрах
		
		// const paramsFromUrl = queryString.parse(location.search)
		// console.log('PARAMS: ',paramsFromUrl)
		// if(Object.keys(paramsFromUrl).length!==0){
		// 	this.setState({...paramsFromUrl}, ()=>{
		// 		console.log("UPD STATE: ", this.state)
		// 	})
		// } 
		//this.setState(...paramsFromUrl)
	}




	handleYear = (selectedOption)=>{
		//если сериал то...
		if(this.props.tv){
			//v2
			// this.setState({first_air_date_year: selectedOption==null ? "" : selectedOption}, ()=>{	
			// 	this.pushParams()
			// })
			this.pushParams({first_air_date_year: selectedOption==null ? "" : selectedOption})	
		} else {
			//v2
			// this.setState({year: selectedOption==null ? "" : selectedOption}, ()=>{	
			// 	this.pushParams()
			// })
			this.pushParams({year: selectedOption==null ? "" : selectedOption})	
		}
		
	}

	handleFromYear = (selectedOption)=>{
		//получаем из года Date

		let dateFromYear = new Date(selectedOption, 1,0,0,0,0,0);
		
		let isoDate = dateFromYear.toISOString().slice(0,10)

		//если сериал то...
		if(this.props.tv){
			//v2
			// this.setState({'first_air_date.gte': selectedOption==null ? "" : isoDate}, ()=>{
			// 	this.pushParams()
			// })
			this.pushParams({'first_air_date.gte': selectedOption==null ? "" : isoDate})	
		} else {
			//v2
			// this.setState({'primary_release_date.gte': selectedOption==null ? "" : isoDate}, ()=>{
			// 	this.pushParams()
			// })
			this.pushParams({'primary_release_date.gte': selectedOption==null ? "" : isoDate})	

		}

		
	}

	handleGenre = (selectedOption)=>{
		//v2
		// this.setState({with_genres: selectedOption==null ? "" : selectedOption}, ()=>{ 
		// 	this.pushParams()
		// })
		//v3
		this.pushParams({with_genres: selectedOption==null ? "" : selectedOption})
	}

	handleSort = (selectedOption)=>{
		//v2
		// this.setState({sort_by: selectedOption.value}, ()=>{
		// 	this.pushParams()
		// })
		//v3
		this.pushParams({sort_by: selectedOption.value})
	}

	// handleOrigLang = (e)=>{
	// 	this.setState({with_original_language: (this.state.with_original_language !=="en") ? "en" : ""}, ()=>{
	// 		this.props.loadFiltered({params: this.state})
	// 	})
	// }
	


	componentWillReceiveProps(nextProps){
		//обновляем фильтры при хождении в history туда сюда
		this.parseUrlParams()
		
		console.log("STATE: ", this.state)
	}


	componentDidMount(){	
		this.parseUrlParams()
	}

	render(){
		const tv = this.props.tv; 
		const params = queryString.parse(location.search)

		return(
			<div className="movie-filter-container">
				<div className="movie-filter-inner-container">
					<div className="movie-filter-item">
						<h3>Genres</h3>
						<Select
				        name="genre"
				       	placeholder="Genres"
				        value={params.with_genres}
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
				        value={tv ? params.first_air_date_year : params.year}
				        onChange={this.handleYear}
				        options={getYearOptions(1975)}
				        simpleValue
				     	/>
					</div>

					<div className="movie-filter-item">
						<h3>Sort by</h3>
						<Select
				        name="sort"
				        placeholder="Sort by"
				        value={params.sort_by}
				        onChange={this.handleSort}
				        options={tv ? sortByTV : sortByMovies}
				        clearable={false}

				     	/>
					</div>

					<div className="movie-filter-item">
						<h3>From Year</h3>
						<Select
				        name="fromYear"
				        placeholder="Since"
				        value={ tv ? sliceDate(params['first_air_date.gte']) : sliceDate(params['primary_release_date.gte'])}
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

export default withRouter(Filter);
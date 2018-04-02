import React,{Component} from 'react'
import queryString from 'query-string'
import Select from 'react-select'
import 'react-select/dist/react-select.css';
import {
		 genresOptionsMovie,
		 genresOptionsMovieRu, 
		 genresOptionsTV, 
		 genresOptionsTVRu, 
		 getYearOptions, 
		 sortByTV, 
		 sortByTVRu, 
		 sortByMovies, 
		 sortByMoviesRu,
		 countryOptions,
		 countryOptionsRu
		} from '../options/filterOptions'
import {withRouter} from 'react-router-dom'
import {sliceDate} from '../utils/helpers'
import merge from 'deepmerge'
import { defineMessages, injectIntl} from 'react-intl'

const messages = defineMessages({
	genres: {
		id: 'filter.genres',
		defaultMessage: 'Genres'
	},
	year: {
		id: 'filter.year',
		defaultMessage: 'Year'
	},
	sort_by: {
		id: 'filter.sort_by',
		defaultMessage: 'Sort by'
	},
	from_year: {
		id: 'filter.from_year',
		defaultMessage: 'From Year'
	},
	country: {
		id: 'filter.country',
		defaultMessage: 'Country'
	},
	country_plh: {
		id: 'filter.country_placeholder',
		defaultMessage: 'Country'
	},
	end_year: {
		id: 'filter.end_year',
		defaultMessage: 'End Year'
	}
})


class Filter extends Component {
	constructor(props){
		super(props);
	}

	//метод для пушинга параметров в URL при смене значения в фильтре
	pushParams = (paramFromFilter={})=>{
		const tv = this.props.tv;

		//нужно слить параметры из нескольких фильтров
		//Получаем параметры из URL
		const paramsFromUrl = queryString.parse(location.search);

		//set first page every time when filter opt changes
		const mergedOptions = merge.all([paramsFromUrl, paramFromFilter, {page: 1}])

		const stringified = queryString.stringify(mergedOptions)
		
		this.props.history.push(`/${tv ? 'series' : 'movies'}?${stringified}`)
	}

	
	handleYear = (selectedOption)=>{
		//если сериал то...
		if(this.props.tv){
			this.pushParams({first_air_date_year: selectedOption==null ? "" : selectedOption})	
		} else {
			this.pushParams({year: selectedOption==null ? "" : selectedOption})	
		}
		
	}

	handleFromYear = (selectedOption)=>{
		//получаем из года Date
		let dateFromYear = new Date(selectedOption, 1,0,0,0,0,0);	
		let isoDate = dateFromYear.toISOString().slice(0,10)

		//если сериал то...
		if(this.props.tv){
			this.pushParams({'first_air_date.gte': selectedOption==null ? "" : isoDate})	
		} else {
			this.pushParams({'primary_release_date.gte': selectedOption==null ? "" : isoDate})	

		}

	}

	handleEndYear = (selectedOption)=>{
		let dateFromYear = new Date(selectedOption, 1,0,0,0,0,0);	
		let isoDate = dateFromYear.toISOString().slice(0,10)

		//если сериал то...
		if(this.props.tv){
			this.pushParams({'first_air_date.lte': selectedOption==null ? "" : isoDate})	
		} else {
			this.pushParams({'primary_release_date.lte': selectedOption==null ? "" : isoDate})	

		}
	}

	handleGenre = (selectedOption)=>{
		this.pushParams({with_genres: selectedOption==null ? "" : selectedOption})
	}

	handleSort = (selectedOption)=>{
		this.pushParams({sort_by: selectedOption.value})
	}

	handleOrigLang = (selectedOption)=>{
		 this.pushParams({with_original_language: selectedOption})	
	
	}
	
	render(){
		const tv = this.props.tv;
		const loc = this.props.intl.locale 
		const params = queryString.parse(location.search)
		const genresOptionsMovieLang =  loc=="ru" ? genresOptionsMovieRu : genresOptionsMovie;
		const genresOptionsTVLang =  loc=="ru" ? genresOptionsTVRu : genresOptionsTV;
		const sortByTVLang = loc=="ru" ? sortByTVRu : sortByTV;
		const sortByMoviesLang = loc=="ru" ? sortByMoviesRu : sortByMovies;
		const countryOptionsLang = loc=="ru" ? countryOptionsRu : countryOptions;


		return(
			<div className="movie-filter-container">
				<div className="movie-filter-inner-container">
					<div className="movie-filter-item filter-genre">
						{/*<h3>{this.props.intl.formatMessage(messages.genres)}</h3>*/}
						<Select
				        name="genre"
				       	placeholder={this.props.intl.formatMessage(messages.genres)}
				        value={params.with_genres}
				        onChange={this.handleGenre}
				        options={tv ? genresOptionsTVLang : genresOptionsMovieLang}
						multi
						simpleValue
				     	/>
					</div>

					<div className="movie-filter-item filter-genre">
						{/*<h3>{this.props.intl.formatMessage(messages.sort_by)}</h3>*/}
						<Select
				        name="sort"
				        placeholder={this.props.intl.formatMessage(messages.sort_by)}
				        value={params.sort_by}
				        onChange={this.handleSort}
				        options={tv ? sortByTVLang : sortByMoviesLang}
				        clearable={false}

				     	/>
					</div>

					

					

					<div className="movie-filter-item">
						{/*<h3>{this.props.intl.formatMessage(messages.from_year)}</h3>*/}
						<Select
				        name="fromYear"
				        placeholder={this.props.intl.formatMessage(messages.from_year)}
				        value={ tv ? sliceDate(params['first_air_date.gte']) : sliceDate(params['primary_release_date.gte'])}
				        onChange={this.handleFromYear}
				        options={getYearOptions(1970)}
				        simpleValue
				     	/>
					</div>
					<div className="movie-filter-item">
						{/*<h3>{this.props.intl.formatMessage(messages.from_year)}</h3>*/}
						<Select
				        name="endYear"
				        placeholder={this.props.intl.formatMessage(messages.end_year)}
				        value={ tv ? sliceDate(params['first_air_date.lte']) : sliceDate(params['primary_release_date.lte'])}
				        onChange={this.handleEndYear}
				        options={getYearOptions(1970)}
				        simpleValue
				     	/>
					</div>




					<div className="movie-filter-item">
						{/*<h3>{this.props.intl.formatMessage(messages.year)}</h3>*/}
						<Select
				        name="year"
				        placeholder={this.props.intl.formatMessage(messages.year)}
				        value={tv ? params.first_air_date_year : params.year}
				        onChange={this.handleYear}
				        options={getYearOptions(1975)}
				        simpleValue
				     	/>
					</div>


					<div className="movie-filter-item">
						{/*<h3>{this.props.intl.formatMessage(messages.country)}</h3>*/}
						<Select
				        name="country"
				        placeholder={this.props.intl.formatMessage(messages.country_plh)}
				        value={params.with_original_language}
				        onChange={this.handleOrigLang}
				        options={countryOptionsLang}
				        simpleValue
				     	/>
					</div>

				</div>
								
			</div>
		)
	}
}

export default withRouter(injectIntl(Filter));
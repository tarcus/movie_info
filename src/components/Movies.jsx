import React, {Component} from 'react'
import axios from 'axios'
import { defineMessages,injectIntl} from 'react-intl'
import MoviesView from './MoviesView'
import Filter from './Filter'
import merge from 'deepmerge'
import {Link, withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import {api_key, baseUrl} from '../options/apiOptions'

//i18n
const messages = defineMessages({
	movies_h1_movies: {
		id: 'movies.h1_movies',
		defaultMessage: 'Movies'
	},
	movies_h1_series: {
		id: 'movies.h1_series',
		defaultMessage: 'Series'
	},
}) 


class Movies extends Component{
	constructor(props){
		super(props);

		this.state = {
			movies: [],
		 	totalResults: '',
		 	page: 1,
		}
	}

	
	loadFiltered = ()=>{	

		const tv = this.props.tv;
		//получаем язык 
		const lang = {params:{
			language: this.props.intl.locale
		}}

		//Получаем параметры из URL 
		const paramsFromUrl = queryString.parse(location.search);
		console.log('PARAMS FROM URL: ', paramsFromUrl)
		const filteredOptions = {params: paramsFromUrl}

		const defaultOptions = {
				url: `${baseUrl}/discover/${tv ? 'tv' : 'movie'}`,
				params: {
					api_key,
					language: lang,
					sort_by: 'popularity.desc',
					'vote_count.gte': 50,
					with_original_language: 'en',
					page: 1,
				},
				timeout: 3000,
		}

		

		//сливаем дефолтный конфиг и полученный из фильтра
		const mergedOptions = merge.all([defaultOptions, filteredOptions, lang])
		

		axios(mergedOptions)
		.then((response)=>{
			console.log('RESPONSE: ', response.data)
			this.setState({
				movies: response.data.results, 
				totalResults: response.data.total_results,
				page: response.data.page
			})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const firstMov = document.querySelector('.movie-filter-container')	
			scrollIntoViewIfNeeded(firstMov, { duration: 500, easing: 'ease', offset: {top: -5}})
		}, 350)
		
	}

	handlePageChange = (pageNumber)=> {

	    //Нужно получить параметры URL и к ним добавить страницу(точнее изменить на ту что даст пагинатор)
	    const pageNum = {page: pageNumber};
		const paramsFromUrl = queryString.parse(location.search);

		const mergedOptions = merge.all([paramsFromUrl, pageNum])
		console.log('MERGED: ', mergedOptions)

		//сериализуем объект в строку параметров
		const stringified = queryString.stringify(mergedOptions)

		//Нужно запушить измененные параметры в URL
		this.props.history.push(`/${this.props.tv ? 'series' : 'movies'}?${stringified}`)

		this.scrollPageToBegining()

    
  	}

	componentDidMount(){
		this.loadFiltered()
	}

	componentWillReceiveProps(){
		this.loadFiltered()
	}

	

	render(){
		const tv = this.props.tv;
		return(
			<div className="movies-container row">
				<h1>{tv ? this.props.intl.formatMessage(messages.movies_h1_series) : this.props.intl.formatMessage(messages.movies_h1_movies)}</h1>
				<Filter tv={tv}  loadFiltered={this.loadFiltered}/>
				<MoviesView movies={this.state.movies} />
				<div className="pagination-wrapper">
					<Pagination
			          activePage={this.state.page}
			          itemsCountPerPage={20}
			          totalItemsCount={this.state.totalResults}
			          pageRangeDisplayed={5}
			          onChange={this.handlePageChange}
			          itemClass='page-item'
			          linkClass='page-link'
			          linkClassPrev='page-link-prev'
			          linkClassNext='page-link-next'
			          activeLinkClass='active-link'
			          nextPageText='&rarr;'
			          prevPageText='&larr;'
			        />
				</div>
			</div>	
		)
	}
}

export default withRouter(injectIntl(Movies));
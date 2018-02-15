import React, {Component} from 'react'
import axios from 'axios'
import {injectIntl} from 'react-intl'
import MoviesView from './MoviesView'
import Filter from './Filter'
import merge from 'deepmerge'
import {Link, withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Pagination from "react-js-pagination"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import {api_key, baseUrl} from '../options/apiOptions'


class Movies extends Component{
	constructor(props){
		super(props);

		this.state = {
			movies: [],
		 	totalResults: '',
			defaultOptions: {
				url: `${baseUrl}/discover/movie`,
				method: 'get',
				params: {
					api_key,
					language: 'en',
					sort_by: 'popularity.desc',
					include_adult: false,
					include_video: false,
					page: 1,
				},
				timeout: 2000,
			}
		}
	}


	loadFiltered = (filteredOptions={})=>{

		
		//получаем язык 
		const lang = {params:{
			language: this.props.intl.locale
		}}
		//сливаем дефолтный конфиг и полученный из фильтра
		const mergedOptions = merge.all([this.state.defaultOptions, filteredOptions, lang])
		this.setState({defaultOptions: mergedOptions}, ()=>{
			console.log('DEF OPT: ',this.state.defaultOptions)
		})
		

		//пушим строку параметров в url bar
		const stringified = queryString.stringify(mergedOptions.params)

		//при первой загрузке не пушим параметры в url bar
		if(filteredOptions.params !== undefined){

			//this.props.history.push(`/movies?${stringified}`)
		}
		
		//console.log(queryString.parse(location.search))

		
		axios(mergedOptions)
		.then((response)=>{
			console.log('RESPONSE: ', response.data)
			this.setState({
				movies: response.data.results, 
				totalResults: response.data.total_results
			})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	scrollPageToBegining = ()=>{
		//setTimeout(()=>{const firstMov = document.querySelector('.movies-view-container :first-child')
		setTimeout(()=>{const firstMov = document.querySelector('.movie-filter-container')	
		scrollIntoViewIfNeeded(firstMov, { duration: 500, easing: 'easeOut' })}, 300)
		
	}

	handlePageChange = (pageNumber)=> {
	    if(pageNumber !==this.state.defaultOptions.params.page){

	    	this.loadFiltered({params: {page: pageNumber}})
	    	this.scrollPageToBegining()
	    }
    
  	}

	componentDidMount(){
		console.log('MOVIES DID MOUNT')
		this.loadFiltered()
	}

	

	render(){
		console.log('Movies component render fire')
		return(
			<div className="movies-container">
				<Filter loadFiltered={this.loadFiltered}/>
				<MoviesView movies={this.state.movies} />
				<div className="pagination-wrapper">
					<Pagination
			          activePage={this.state.defaultOptions.params.page}
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
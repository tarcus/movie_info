import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import queryString from 'query-string'
import SearchView from './SearchView'
import Pagination from "react-js-pagination"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'


class Search extends Component {
	constructor(props){
		super(props);
	
		this.state = {data: {results: []}}
	}

	search = (pageNum)=>{
		
		const searchQuery = queryString.parse(location.search)
		console.log(searchQuery)

		const options = {
			url: `${baseUrl}/search/multi`,
			timeout: 4000,
			params: {
				api_key: api_key,
				language: this.props.intl.locale,
				query: searchQuery.query,
				page: pageNum,
				include_adult: false,
				
			}
		}

		axios(options)
		.then((response)=>{
			console.log('SEARCH: ', response.data)
			this.setState({data: response.data})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	handlePageChange = (pageNumber)=> {
	    if(pageNumber !==this.state.data.page){
	    	this.search(pageNumber)
	    	this.scrollPageToBegining()
	    }
    
  	}

  	scrollPageToBegining = ()=>{
		setTimeout(()=>{const first = document.querySelector('.search-results-container')	
			scrollIntoViewIfNeeded(first, { duration: 300, easing: 'easeIn', offset: {top: -5}})
		}, 350)
		
	}

	componentDidMount(){
		this.search();
	}

	componentWillReceiveProps(nextProps){
		this.search()
	}

	render(){
		return(
			<div className="search-results-container row">
				<SearchView data={this.state.data}/>
				<div className="pagination-wrapper">
							<Pagination
					          activePage={this.state.data.page}
					          itemsCountPerPage={20}
					          totalItemsCount={this.state.data.total_results}
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

export default injectIntl(Search);
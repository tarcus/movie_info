import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import queryString from 'query-string'
import SearchView from './SearchView'


class Search extends Component {
	constructor(props){
		super(props);
	
		this.state = {data: {results: []}}
	}

	search = ()=>{
		
		const searchQuery = queryString.parse(location.search)
		console.log(searchQuery)

		const options = {
			url: `${baseUrl}/search/multi`,
			method: 'get',
			timeout: 4000,
			params: {
				api_key: api_key,
				language: this.props.intl.locale,
				query: searchQuery.query,
				page: 1,
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
			</div>
		)
	}
}

export default injectIntl(Search);
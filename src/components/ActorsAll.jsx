import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl, defineMessages} from 'react-intl'
import ActorCard from './ActorCard'
import Pagination from "react-js-pagination"
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'

//i18n
const messages = defineMessages({
	actorsall_h1: {
		id: 'actorsall.h1',
		defaultMessage: 'Top Rated Actors'
	}
}) 

class ActorsAll extends Component {
	constructor(props){
		super(props);

		this.state = {people: [], page: 1, totalResults: ''}
	}

	getPopularPeople = (pageNum)=>{
		const options = {	
			timeout: 3000,
			url: `${baseUrl}/person/popular`,
			params: {
				api_key,
				language: this.props.intl.locale,
				page: pageNum	
			}
		}

		axios(options)
		.then((response)=>{
			this.setState({
				people: response.data.results, 
				page: response.data.page, 
				totalResults: response.data.total_results
			})
		})
		.catch((error)=>{
			console.log(error)
		})	

	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const firstMov = document.querySelector('.people-pop-wrap')	
			scrollIntoViewIfNeeded(firstMov, { duration: 300, easing: 'easeIn', offset: {top: -5}})
		}, 350)
		
	}

	handlePageChange = (pageNumber)=> {
	    if(pageNumber !==this.state.page){
	    	this.getPopularPeople(pageNumber)
	    	this.scrollPageToBegining()
	    }
    
  	}

	
	componentDidMount(){
		this.getPopularPeople();
	}

	render(){
		const people = this.state.people.map((item)=>{
			return <ActorCard  data={item} key={item.id} />			
		})
		return(
			<div className="home row">
				<div className="home-col-1">				
						<h1 className="text-center">{this.props.intl.formatMessage(messages.actorsall_h1)}</h1>
					<div className="people-pop-wrap row">
						{people}	
					</div>
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
					          linkClassFirst='page-link-first'
					  		  linkClassLast='page-link-last'
					        />
					</div>			
				</div>	
			</div>

			
		)
	}
}

export default injectIntl(ActorsAll);
import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import ActorCardW154 from './ActorCardW154'
import ActorCard from './ActorCard'

class PeoplePop extends Component {
	constructor(props){
		super(props);

		this.state = {people: []}
	}

	getPopularPeople = ()=>{
		const options = {	
			timeout: 3000,
			url: `${baseUrl}/person/popular`,
			params: {
				api_key,
				language: this.props.intl.locale,
				page: 7	
			}
		}

		axios(options)
		.then((response)=>{
			console.log('POPULAR PEOPLE: ',response.data)
			this.setState({people: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})	

	}

	
	componentDidMount(){
		this.getPopularPeople();
	}

	render(){
		const people = this.state.people.map((item)=>{
			return <ActorCard  data={item} key={item.id} />			
		})
		return(
			<div className="people-pop-wrap row">
				{people}
			</div>
		)
	}
}

export default injectIntl(PeoplePop);
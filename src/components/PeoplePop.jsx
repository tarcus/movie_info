import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import {Link} from 'react-router-dom'

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
				page: 3	
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
			return <div className="actor-w92-wrap" key={item.id}>
				<Link to={`/actors/${item.id}`}>
				<img src={`https://image.tmdb.org/t/p/w92/${item.profile_path}`}/>
				</Link>
				<div className="actor-w92-name">
					{item.name}
				</div>
			</div>
		})
		return(
			<div className="people-pop-wrap row">
				{people}
			</div>
		)
	}
}

export default injectIntl(PeoplePop);
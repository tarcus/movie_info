import React,{Component} from 'react'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import ActorsView from './ActorsView'

class Actors extends Component {
	constructor(props){
		super(props)

		this.state = {data: {}}
	}

	getActor = (id)=>{
		const options = {
			url: `${baseUrl}/person/${id}`,
			method: 'get',
			timeout: 3000,
			params: {
				api_key: api_key,
				language: this.props.intl.locale,
				append_to_response: 'movie_credits'
			}
		}

		axios(options)
		.then((response)=>{
			console.log('MOVIES VITH ACTOR', response.data)
			this.setState({data: response.data})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	componentDidMount(){
		this.getActor(this.props.match.params.id)
	}

	render(){
		return(
			<div className="actors-main-wrap">
				<ActorsView
					actor={this.state.data}  
				/>
			</div>
		)
	}




}

export default injectIntl(Actors);
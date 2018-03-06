import React, {Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import ResponsiveEmbed from 'react-responsive-embed'

class Trailers extends Component {
	constructor(props){
		super(props)

		this.state = {trailers: []}
	}

	
	getTrailers = (movieId)=>{
		const options = {
			url: `${baseUrl}/${this.props.mediaType}/${movieId}/videos`,
			params: {
				api_key,
				language: this.props.language
			}
		}

		axios(options)
		.then((response)=>{
			console.log('Trailers: ', response.data)
			this.setState({trailers: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})
	}
	
	componentDidMount(){
		this.getTrailers(this.props.movieId);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.movieId !== this.props.movieId){
			
			this.getTrailers(nextProps.movieId)
		}
	}

	render(){
		return(
			<div className="trailers-wrap">
				<h2>Trailer</h2>
				{this.state.trailers.slice(0,1).map((item)=>{
					return <div className="trailer-video" key={item.id}>
						<ResponsiveEmbed 
							src={`https://www.youtube.com/embed/${item.key}`} 
							allowFullScreen
							ratio='16:9' 
						/>	
					</div>
				})}
			</div>
		)
	}
}


export default Trailers;

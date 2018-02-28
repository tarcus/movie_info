import React,{Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {Link} from 'react-router-dom'

class Similar extends Component {
	constructor(props){
		super(props);

		this.state = {data: []}
	}


	getSimilar = (movieId)=>{
		const options = {
			url: `${baseUrl}/movie/${movieId}/recommendations`, //or can use similar instead
			params: {
				api_key,
				language: this.props.language,
				page: 1
			}
		}

		axios(options)
		.then((response)=>{
			
			this.setState({data: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	componentDidMount(){
		this.getSimilar(this.props.movieId);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.movieId !== this.props.movieId){
			this.getSimilar(nextProps.movieId)
		}
	}

	render(){
		return(
			<div className="similar-wrap">
				{this.state.data.slice(0, 6).map((item)=>{
					return <div className="similar-item" key={item.id}>
						<Link to={`/movies/${item.id}`}>
							<img src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}/>
						</Link>
						
					</div>
				})}
			</div>
		)
	}
}

export default Similar;
import React,{Component} from 'react'
import Filter from './Filter'
import Movies from './Movies'

class Series extends Component {
	constructor(props){
		super(props);

	}

	render(){
		return(
			<div className="movies-container">	
				<Movies tv={this.props.tv}/>
			</div>
		)
	}
}

export default Series;
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
//import queryString from 'query-string'

class SearchForm extends Component {
	constructor(props){
		super(props);
		
		this.state = {searchText: ''}
	}

	

	handleSubmit = (e)=>{
		e.preventDefault();
		//Проверяем не пустое ли поле запроса, и если нет то...
		if(this.searchInput.value){
			this.setState({searchText: this.searchInput.value}, ()=>{
				console.log(this.state.searchText)
				this.props.history.push(`/search?query=${this.state.searchText}`)
			})
		}
		
		
	}

	render(){
		return(
			<div className="search-form">
				<form onSubmit={this.handleSubmit}>
					<input type="text" ref={(input)=>{this.searchInput=input}} placeholder="Search..." />
					<button type="submit"><FontAwesome name='search' className="fa-search" /></button>
				</form>
			</div>
		)
	}
}

export default withRouter(SearchForm);
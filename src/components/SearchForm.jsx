import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {defineMessages,injectIntl} from 'react-intl'

const messages = defineMessages({
	search_form_placeholder: {
		id: 'search_form.placeholder',
		defaultMessage: 'Search'
	}
})

class SearchForm extends Component {
	constructor(props){
		super(props);	
		this.state = {searchText: ''}
	}
	
	handleSubmit = (e)=>{
		e.preventDefault();
		//Check whether input empty or not
		if(this.searchInput.value){
			this.setState({searchText: this.searchInput.value}, ()=>{
				this.props.history.push(`/search?query=${this.state.searchText}`)
			})
		}
			
	}

	render(){
		return(
			<div className="search-form">
				<form onSubmit={this.handleSubmit}>
					<button type="submit"><FontAwesome name='search' className="fa-yellow" /></button>
					<input type="text" ref={(input)=>{this.searchInput=input}} placeholder={this.props.intl.formatMessage(messages.search_form_placeholder)} />	
				</form>
			</div>
		)
	}
}

export default withRouter(injectIntl(SearchForm));
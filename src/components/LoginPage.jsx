import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { defineMessages,injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	login_page_h1: {
		id: 'login_page.h1',
		defaultMessage: 'Login Now'
	},
	login_page_not_registered: {
		id: 'login_page.not_registered',
		defaultMessage: 'Not registered?'
	},
	login_page_create_account: {
		id: 'login_page.create_account',
		defaultMessage: 'Create an account'
	},
	login_page_submit_btn: {
		id: 'login_page.submit_btn',
		defaultMessage: 'Log in'
	}
}) 

class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	submitHandle = (e)=>{
		e.preventDefault()
		const email = this.emailInput.value;
		const password = this.passInput.value;

		//залогинить юзера
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user)=>{
			//Redirect after login
			 this.props.history.goBack()
		})
		.catch((error)=>{
			this.setState({fireLogInErr: error.message})
		})
		
	}

	logOut = ()=>{
		firebase.auth().signOut();
	}

	render(){
		return(
			<div className="form-center row">
				
					<div className="register-form-wrap login-form-wrap">
						<div className="login-form-header">
							<h1 className="text-center">{this.props.intl.formatMessage(messages.login_page_h1)}</h1>
						</div>
						<form  className="login-form" onSubmit={this.submitHandle}>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email" ref={(input)=>{this.emailInput=input}}/>
								<FontAwesome className="fa-input" name='envelope'/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder='Password' ref={(input)=>{this.passInput=input}}/>
								<span className="form-errors">{this.state.fireLogInErr == null ? '' : this.state.fireLogInErr}</span>
								<FontAwesome className="fa-input" name='lock'/>
							</div>
							<button className="btn-light btn-reg btn-login btn-block btn-blue" type="submit">{this.props.intl.formatMessage(messages.login_page_submit_btn)}</button>
						</form>
						<div className="login-form-reg">
							{this.props.intl.formatMessage(messages.login_page_not_registered)}&nbsp;  
							<Link to="/register">
								<FontAwesome name='pencil'/> {this.props.intl.formatMessage(messages.login_page_create_account)} 
							</Link>
						</div>
						
					</div>
				
			</div>
		)
	}

}

export default withRouter(injectIntl(LoginPage));
import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

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
			//console.log('sign in Login Page: ', user)
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
							<h1 className="text-center">Log in</h1>
						</div>
						<form  className="login-form" onSubmit={this.submitHandle}>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email" ref={(input)=>{this.emailInput=input}}/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Password" ref={(input)=>{this.passInput=input}}/>
								<span className="form-errors">{this.state.fireLogInErr == null ? '' : this.state.fireLogInErr}</span>
							</div>
							<button className="btn-light btn-reg btn-login btn-block btn-blue" type="submit">Log in</button>
						</form>
						<div className="login-form-reg">
							Not registered?&nbsp;  
							<Link to="/register">
								Create an account <FontAwesome name='pencil'  />
							</Link>
						</div>
						
					</div>
				
			</div>
		)
	}

}

export default withRouter(LoginPage);
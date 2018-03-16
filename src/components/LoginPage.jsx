import React, {Component} from 'react'

//const auth = firebase.auth();

class LoginPage extends Component {
	constructor(props){
		super(props);

	}

	submitHandle = (e)=>{
		e.preventDefault()

		const email = this.emailInput.value;
		const password = this.passInput.value;


		//залогинить юзера
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then((user)=>{
			console.log('sign in Login Page: ', user)
		})

		//Показать текущего юзера
		console.log('Current User: ',firebase.auth().currentUser)

	}

	logOut = ()=>{
		firebase.auth().signOut();
	}

	render(){
		return(
			<div className="home row">
				
					<div className="login-form-wrap">
						<div className="login-form-header">
							Login, or get the hell out of here
						</div>
						<form  className="login-form" onSubmit={this.submitHandle}>
							<label htmlFor="">Email
								<input type="email" placeholder="Email" ref={(input)=>{this.emailInput=input}}/>
							</label>
							<label htmlFor="">Password
								<input type="password" placeholder="Password" ref={(input)=>{this.passInput=input}}/>
							</label>
							<button type="submit">Log in</button>
						</form>
						<button className="log-out-btn" onClick={this.logOut}>Log Out</button>
					</div>
				
			</div>
		)
	}

}

export default LoginPage;
import React, {Component} from 'react'

class Register extends Component {
	constructor(props){
		super(props);

	}

	submitHandle = (e)=>{
		e.preventDefault()

		//данные из формы
		const userName = this.userNameInput.value;
		const email = this.emailInput.value;
		const password = this.passInput.value;
		const passR = this.passInputR.value;

		//зарегестрировать и сразу же залогинить юзера
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user)=>{
			//Присвоим имя юзеру
			user.updateProfile({ // <-- Update Method here
                    displayName: userName  
            })
			console.log('Register: ', user)

			//Верификация Email
				user.sendEmailVerification()
			    .then(function() {
			      console.log("Verification email sent.") 
			    })
			    .catch(function(error) {
			      console.log('Error Occured verification email') 
			    });
		})
		.catch((error)=>{
			console.log("Register error: ", error)
		})
		
		//TODO VALIDATION

		//Присвоим имя юзеру
		// firebase.auth().onAuthStateChanged(function(user) {
  //               if (user) {
  //                  // Updates the user attributes:
  //                 user.updateProfile({ // <-- Update Method here
  //                   displayName: userName  
  //                 }).then(function() {
  //                   // Profile updated successfully!
  //                   var displayName = user.displayName;
                
  //                 }, function(error) {
  //                   // An error happened.
  //                 });     

  //               }
  //   	});



	}

	render(){
		return(
			<div className="home row">
				
					<div className="login-form-wrap">
						<div className="login-form-header">
							Register
						</div>
						<form  className="login-form" onSubmit={this.submitHandle}>
							<label>User Name
								<input type="text" placeholder="User Name" ref={(input)=>{this.userNameInput=input}}/>
							</label>
							<label>Email
								<input type="email" placeholder="Email" ref={(input)=>{this.emailInput=input}}/>
							</label>
							<label>Password
								<input type="password" placeholder="Password" ref={(input)=>{this.passInput=input}}/>
							</label>
							<label>Repeat Password
								<input type="password" placeholder="Password Again" ref={(input)=>{this.passInputR=input}}/>
							</label>
							<button type="submit">Sign Up</button>
						</form>
					</div>
				
			</div>
		)
	}

}

export default Register;
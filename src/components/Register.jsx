import React, {Component} from 'react'
import isEmail from 'validator/lib/isEmail'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'

//validators
const required = (value) => {
  if (!value.toString().trim().length) {
    return <span className="form-errors">Required.</span>
  }
}
 
const emailValid = (value) => {
  if (!isEmail(value)) {
    return <span className="form-errors">Email Address not Valid.</span>
  }
}
 
const lt = (value) => {
  if (value.toString().trim().length > 16) {
    return <span className="form-errors">Name should be less than {16} characters.</span>
  }
}

const gt = (value) => {
  if (value.toString().trim().length < 6) {
    return <span className="form-errors">Password should be at least {6} characters.</span>
  }
}
 
const password = (value, props, components) => {
  if (value !== components['confirm'][0].value) { 
    return <span className="form-errors">Passwords are not equal.</span>
  }
}

class Register extends Component {
	constructor(props){
		super(props);

		this.state = {};

	}

	submitHandle = (e)=>{
		e.preventDefault()

		//данные из формы, деструктуризация объекта, который вернула функция getValues валидатора 
		const {email, password, username} = this.form.getValues();
		
		//зарегестрировать и сразу же залогинить юзера
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user)=>{
			//Присвоим имя юзеру
			user.updateProfile({ 
                    displayName: username  
            })
			console.log('Register: ', user)

			//Верификация Email
				user.sendEmailVerification()
			    .then(()=> {
			      console.log("Verification email sent.") 
			    })
			    .catch((error)=> {
			      console.log('Error Occured verification email') 
			    });
			//Редиректим юзера туда откуда он пришел
			this.props.history.goBack()
		})
		.catch((error)=>{
			this.setState({fireRegErr: error.message})
			console.log("Register error: ", error)
		})
		

	}

	
	removeEmailErr = ()=>{
		this.setState({fireRegErr: null})
	}

	render(){
		return(
			<div className="row form-center">			
					<div className="register-form-wrap">
						<div className="login-form-header">
							<h1 className="text-center">Register</h1>
						</div>
						<Form  className="login-form" onSubmit={this.submitHandle} ref={c => { this.form = c }}>
							<div className="form-group">
								<Input type="text" className="form-control" validations={[required, lt]} name="username" placeholder="User Name" ref={(c)=>{this.userNameInput=c}}/>	
							</div>
							<div className="form-group">
								<Input type="email" className="form-control" name="email" onFocus={this.removeEmailErr} validations={[required, emailValid]} placeholder="Email" ref={(c)=>{this.emailInput=c}}/>
								<span className="form-errors">{this.state.fireRegErr == null ? '' : this.state.fireRegErr}</span>
							</div>
							<div className="form-group">
								<Input type="password" className="form-control" name='password' validations={[required, password, gt]} placeholder="Password" ref={(c)=>{this.passInput=c}}/>
								
							</div>
							<div className="form-group">
								<Input type="password" className="form-control" name='confirm' validations={[required, password]} placeholder="Confirm Password" ref={(c)=>{this.passInputR=c}}/>
								
							</div>
							<Button className="btn-light btn-reg btn-block btn-blue" type="submit">Sign Up</Button>
						</Form>
					</div>
				
			</div>
		)
	}

}

export default Register;
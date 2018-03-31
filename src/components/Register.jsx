import React, {Component} from 'react'
import isEmail from 'validator/lib/isEmail'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import FontAwesome from 'react-fontawesome'
import { defineMessages,injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	register_page_h1: {
		id: 'register_page.h1',
		defaultMessage: 'Register'
	},
	register_page_sign_up_btn: {
		id: 'register_page.sign_up_btn',
		defaultMessage: 'Sign Up'
	},
	register_page_required: {
		id: 'register_page.required',
		defaultMessage: 'Required.'
	},
	register_page_email_val: {
		id: 'register_page.email_validator',
		defaultMessage: 'Email Address not Valid.'
	},
	register_page_lt_val: {
		id: 'register_page.lt_validator',
		defaultMessage: 'Name should be less than'
	},
	register_page_gt_val: {
		id: 'register_page.gt_validator',
		defaultMessage: 'Password should be at least'
	},
	register_page_val_char: {
		id: 'register_page.characters_validator',
		defaultMessage: 'characters.'
	},
	register_page_pass_val: {
		id: 'register_page.password_validator',
		defaultMessage: 'Passwords are not equal.'
	},
	register_page_name_plh: {
		id: 'register_page.name_placeh',
		defaultMessage: 'User Name'
	},
	register_page_email_plh: {
		id: 'register_page.email_placeh',
		defaultMessage: 'Email'
	},
	register_page_pass_plh: {
		id: 'register_page.password_placeh',
		defaultMessage: 'Password'
	},
	register_page_pass_conf_plh: {
		id: 'register_page.password_confirm_placeh',
		defaultMessage: 'Confirm Password'
	}
	
}) 



class Register extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	//validators
	required = (value) => {
	  	if (!value.toString().trim().length) {
	    	return <span className="form-errors">{this.props.intl.formatMessage(messages.register_page_required)}</span>
	  	}
	}

	emailValid = (value) => {
	  if (!isEmail(value)) {
	    return <span className="form-errors">{this.props.intl.formatMessage(messages.register_page_email_val)}</span>
	  }
	}
	 
	lt = (value) => {
	  if (value.toString().trim().length > 12) {
	    return <span className="form-errors">{this.props.intl.formatMessage(messages.register_page_lt_val)} {12} {this.props.intl.formatMessage(messages.register_page_val_char)}</span>
	  }
	}

	gt = (value) => {
	  if (value.toString().trim().length < 6) {
	    return <span className="form-errors">{this.props.intl.formatMessage(messages.register_page_gt_val)} {6} {this.props.intl.formatMessage(messages.register_page_val_char)}</span>
	  }
	}
	 
	password = (value, props, components) => {
	  if (value !== components['confirm'][0].value) { 
	    return <span className="form-errors">{this.props.intl.formatMessage(messages.register_page_pass_val)}</span>
	  }
	}


	submitHandle = (e)=>{
		e.preventDefault()
		//data from form, getValues() validator's function, return object
		const {email, password, username} = this.form.getValues();
		
		//register and sign in user
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((user)=>{
			//Assign username
			user.updateProfile({ 
                    displayName: username  
            })
			//console.log('Register: ', user)

			//Verify Email
				user.sendEmailVerification()
			    .then(()=> {
			//      console.log("Verification email sent.") 
			    })
			    .catch((error)=> {
			      console.log('Error Occured verification email') 
			    });
			//Redirect
			this.props.history.goBack()
		})
		.catch((error)=>{
			this.setState({fireRegErr: error.message})
		//	console.log("Register error: ", error)
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
							<h1 className="text-center">{this.props.intl.formatMessage(messages.register_page_h1)}</h1>
						</div>
						<Form  className="login-form" onSubmit={this.submitHandle} ref={c => { this.form = c }}>
							<div className="form-group">
								<Input type="text" className="form-control" validations={[this.required, this.lt]} name="username" placeholder={this.props.intl.formatMessage(messages.register_page_name_plh)} ref={(c)=>{this.userNameInput=c}}/>
								<FontAwesome className="fa-input" name='user'/>	
							</div>
							<div className="form-group">
								<Input type="email" className="form-control" name="email" onFocus={this.removeEmailErr} validations={[this.required, this.emailValid]} placeholder={this.props.intl.formatMessage(messages.register_page_email_plh)} ref={(c)=>{this.emailInput=c}}/>
								<FontAwesome className="fa-input" name='envelope'/>
								<span className="form-errors">{this.state.fireRegErr == null ? '' : this.state.fireRegErr}</span>
							</div>
							<div className="form-group">
								<Input type="password" className="form-control" name='password' validations={[this.required, this.password, this.gt]} placeholder={this.props.intl.formatMessage(messages.register_page_pass_plh)} ref={(c)=>{this.passInput=c}}/>
								<FontAwesome className="fa-input" name='lock'/>
							</div>
							<div className="form-group">
								<Input type="password" className="form-control" name='confirm' validations={[this.required, this.password]} placeholder={this.props.intl.formatMessage(messages.register_page_pass_conf_plh)} ref={(c)=>{this.passInputR=c}}/>
								<FontAwesome className="fa-input" name='lock'/>
							</div>
							<Button className="btn-light btn-reg btn-block btn-blue" type="submit">{this.props.intl.formatMessage(messages.register_page_sign_up_btn)}</Button>
						</Form>
					</div>
				
			</div>
		)
	}

}

export default injectIntl(Register);
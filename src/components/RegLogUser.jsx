import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import onClickOutside from "react-onclickoutside";
import userAvatar from '../images/avatar.png'
import AvatarUpload from './AvatarUpload'

class RegLogUser extends Component {
	constructor(props){
		super(props);
		this.state = {isOpen: false};
	}

	toggleDropdown = ()=>{
		this.setState({isOpen: !this.state.isOpen})
	}
	
	//Close the dropdown when click outside
	handleClickOutside = (evt)=>{
    	this.setState({isOpen: false})
  	}

	
	render(){
		const user = this.props.user;
		const dropClasses = classNames({
			'user-dropdown': true,
			'open' : this.state.isOpen
		})

		const angleClasses = classNames({
			'angle': true,
			'open': this.state.isOpen
		})

		//const angle = this.state.isOpen ? 'angle-up' : 'angle-down'


		if(user){
			return(
				<div className="login">
					<div onClick={this.toggleDropdown}>
						<span className="avatar-wrap">
							<img src={user.photoURL == null ? userAvatar : user.photoURL} />
					</span>
					<div className="user-navbar" >
						{user.displayName} <span className={angleClasses}><FontAwesome name='angle-down' className="fa-yellow" /></span> 	
					</div>
					</div>
					
					<div className={dropClasses}>
						<div className="user-dropdown-email">{user.email}</div>
						<AvatarUpload 
						closeUser={this.handleClickOutside}
						user={this.props.user}
						/>
						<div className="user-dropdown-footer">

							<span className="log-out-btn" onClick={this.props.logOut}>Log Out</span>

						</div>
					</div>
				</div>
			)
				
		} else {
			return(
				<div className="login">
					<Link to="/register"><FontAwesome name='pencil-square' className="fa-yellow" /> Register</Link>
					<Link to="/login"><FontAwesome name='sign-in' className="fa-yellow" /> Login</Link>
				</div>
			)
		}

		
	}
}

export default onClickOutside(RegLogUser);
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import onClickOutside from "react-onclickoutside";

class RegLogUser extends Component {
	constructor(props){
		super(props);
		this.state = {userName: '', isOpen: false};
	}

	logOut = ()=>{
		firebase.auth().signOut();
	}

	toggleDropdown = ()=>{
		this.setState({isOpen: !this.state.isOpen})
	}
	
	//Close the dropdown when click outside
	handleClickOutside = (evt)=>{
    	this.setState({isOpen: false})
  	}

	componentDidMount(){
		//отслеживаем состояние юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({userName: user.displayName})
				console.log('FirebaseUser Nav', user)
			} else {
				this.setState({userName: ''})
				console.log('not logged in')
			}
		})

	}

	render(){
		const user = this.state.userName;
		const dropClasses = classNames({
			'user-dropdown': true,
			'close' : !this.state.isOpen
		})

		if(this.state.userName){
			return(
				<div className="login">
					<span className="user-navbar" onClick={this.toggleDropdown}>
						<FontAwesome name='user-circle' className="fa-yellow" /> {user}
					</span>
					<div className={dropClasses}>
						<div className="user-dropdown-footer">
							<button className="log-out-btn" onClick={this.logOut}>Log Out</button>
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
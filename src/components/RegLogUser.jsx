import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import onClickOutside from "react-onclickoutside";
import userAvatar from '../images/avatar.png'

class RegLogUser extends Component {
	constructor(props){
		super(props);
		this.state = {isOpen: false};
	}

	// logOut = ()=>{
	// 	firebase.auth().signOut();
	// }

	toggleDropdown = ()=>{
		this.setState({isOpen: !this.state.isOpen})
	}
	
	//Close the dropdown when click outside
	handleClickOutside = (evt)=>{
    	this.setState({isOpen: false})
  	}

	// componentDidMount(){
	// 	//отслеживаем состояние юзера
	// 	firebase.auth().onAuthStateChanged((user)=>{
	// 		if(user){
	// 			this.setState({userName: user.displayName})
	// 			console.log('FirebaseUser Nav', user)
	// 		} else {
	// 			this.setState({userName: ''})
	// 			console.log('not logged in')
	// 		}
	// 	})

	// }

	render(){
		const user = this.props.userName;
		const dropClasses = classNames({
			'user-dropdown': true,
			'close' : !this.state.isOpen
		})

		if(user){
			return(
				<div className="login">
					<div onClick={this.toggleDropdown}>
						<span className="avatar-wrap">
							<img src={userAvatar} />
					</span>
					<div className="user-navbar" >
						{user}	
					</div>
					</div>
					
					<div className={dropClasses}>
						<div className="user-dropdown-footer">
							<Link to="/watchlist">Watch List</Link>
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
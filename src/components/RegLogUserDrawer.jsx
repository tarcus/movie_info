import React from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import userAvatar from '../images/avatar.png'

const RegLogUserDrawer = ({user})=>{
	
		if(user){
			return(
				<div className="login-drawer">
					<div className="avatar-user-wrap">
						<span className="avatar-wrap-drawer">
							<img src={userAvatar} />
						</span>
						<div className="user-navbar-drawer" >
							{user}	
						</div>
					</div>
					
					
					
					{/*<div className={dropClasses}>
						<div className="user-dropdown-footer">
							<Link to="/watchlist">Watch List</Link>
							<span className="log-out-btn" onClick={this.props.logOut}>Log Out</span>
						</div>
					</div>*/}
				</div>
			)
				
		} else {
			return(
				<div className="login-drawer">
					<div className="avatar-user-wrap">
						<span className="avatar-wrap-drawer">
							<img src={userAvatar} />
						</span>
						<div className="user-navbar-drawer" >
							<Link className="drawer-login-link" to="/login"><FontAwesome name='sign-in' className="fa-yellow" /> Login</Link>	
						</div>
					</div>
					{/*<Link to="/register"><FontAwesome name='pencil-square' className="fa-yellow" /> Register</Link>*/}
					
				</div>
			)
		}
	
}

export default RegLogUserDrawer;
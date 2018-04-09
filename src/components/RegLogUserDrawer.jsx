import React from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import userAvatar from '../images/avatar.png'

const RegLogUserDrawer = ({user, drawerToggle, loginTr})=>{
	
		if(user){
			return(
				<div className="login-drawer">
					<div className="avatar-user-wrap">
						<span className="avatar-wrap-drawer">
							<img src={user.photoURL == null ? userAvatar : user.photoURL} />
						</span>
						<div className="user-navbar-drawer" >
							{user.displayName}	
						</div>
						<div className="avatar-mail-drawer">
							{user.email}
						</div>
					</div>
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
							<Link className="drawer-login-link" 
							to="/login"
							onClick={drawerToggle}
							>{loginTr} <FontAwesome name='sign-in' className="fa-drawer-nav" />
							</Link>	
						</div>
					</div>	
				</div>
			)
		}
	
}

export default RegLogUserDrawer;
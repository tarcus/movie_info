import React,{ Component } from 'react'
//import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import RegLogUserDrawer from './RegLogUserDrawer'
import {NavLink} from 'react-router-dom'

const Drawer = (props)=> {
	
	const drawerClasses = classNames({
			'drawer': true,
			'close' : !props.drawerOpen
	})

		return(
			<div className={drawerClasses}>
				<div className="drawer-header">
					<RegLogUserDrawer user={props.user} drawerToggle={props.drawerToggle} />
					<span className="drawer-close-btn" onClick={props.drawerToggle}>
						&times;
					</span>
				</div>
				
				<div className="inner-wrap" onClick={props.drawerToggle}>
					{props.user !== '' && 
						<NavLink to="/watchlist">Watchlist</NavLink>
					}
					
					{props.navElems}
					
					{props.user !== '' &&
						<span className="drawer-logout" onClick={props.logOut}>Log Out</span>
					}
					
				</div>
				
			</div>
		)
	
}

export default Drawer;
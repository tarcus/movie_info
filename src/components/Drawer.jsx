import React,{ Component } from 'react'
//import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import RegLogUserDrawer from './RegLogUserDrawer'

const Drawer = (props)=> {
	
	const drawerClasses = classNames({
			'drawer': true,
			'close' : !props.drawerOpen
	})

		return(
			<div className={drawerClasses}>
				<div className="drawer-header">
					<RegLogUserDrawer user={props.user}/>
					<span className="drawer-close-btn" onClick={props.drawerToggle}>
						&times;
					</span>
				</div>
				
				<div className="inner-wrap" onClick={props.drawerToggle}>
					{props.navElems}
					<span className="drawer-logout" onClick={props.logOut}>Log Out</span>
				</div>
				
			</div>
		)
	
}

export default Drawer;
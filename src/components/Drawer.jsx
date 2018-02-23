import React,{ Component } from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'

const Drawer = (props)=> {
	
	const drawerClasses = classNames({
			'drawer': true,
			'close' : !props.drawerOpen
	})

		return(
			<div className={drawerClasses}>
				<div className="drawer-header">
					<h2></h2>
					<span className="drawer-close-btn" onClick={props.drawerToggle}>
						&times;
					</span>
				</div>
				
				<div className="inner-wrap">
					{props.navElems}
				</div>
				
			</div>
		)
	
}

export default Drawer;
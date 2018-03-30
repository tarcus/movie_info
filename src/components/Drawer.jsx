import React from 'react'
import classNames from 'classnames'
import RegLogUserDrawer from './RegLogUserDrawer'
import {NavLink} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import {defineMessages, injectIntl} from 'react-intl'

const messages = defineMessages({
	drawer_watchlist: {
		id: 'drawer.watchlist',
		defaultMessage: 'Watchlist'
	},
	drawer_log_out: {
		id: 'drawer.log_out',
		defaultMessage: 'Log Out'
	}
}) 

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
					{props.navElems}
					{props.user !== '' && 
						<NavLink to="/watchlist"><FontAwesome name='th-list' className="fa-drawer-nav"/>{props.intl.formatMessage(messages.drawer_watchlist)}</NavLink>
					}
					
					{props.user !== '' &&
						<span className="drawer-logout" onClick={props.logOut}><FontAwesome name='sign-out' className="fa-drawer-nav"/>{props.intl.formatMessage(messages.drawer_log_out)}</span>
					}
					
				</div>		
			</div>
		)
	
}

export default injectIntl(Drawer);
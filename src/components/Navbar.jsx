import React,{Component} from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import LangSelector from './LangSelector'
import {Link, NavLink} from 'react-router-dom'
import SearchForm from './SearchForm'
import Drawer from './Drawer'
import RegLogUser from './RegLogUser'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	navbar_watchlist: {
		id: 'navbar.watchlist_menu_item',
		defaultMessage: 'Watchlist'
	}
}) 


class Navbar extends Component {
	constructor(props){
		super(props);

		this.state = {isOpen: false, drawerOpen: true, user: null};
	}

	navbarToggle =()=>{
		this.setState({isOpen: !this.state.isOpen});
	}

	drawerToggle = ()=>{
		this.setState({drawerOpen: !this.state.drawerOpen})
	}
	
	
	logOut = ()=>{
		firebase.auth().signOut();
	}

	handleClickOutside = (evt)=>{
    	this.setState({drawerOpen: true})
  	}


	componentDidMount(){
		//отслеживаем состояние юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({user: user})
				//console.log('FirebaseUser Nav', user)
			} else {
				this.setState({user: ''})
				console.log('not logged in')
			}
		})

	}


	render(){
		const navClasses = classNames({
			'navbar-expand': true,
			'close' : !this.state.isOpen
		})

		return(		
				<div className="navbar">
					<div className="navbar-logo-wrap">
						<span className="navbar-logo">
							<Link to="/"></Link>
						</span>
					</div>
					
					<div className="navbar-inner-wrap">
						<nav className="navigation">
							{this.props.children}
							<NavLink to="/watchlist">{this.props.intl.formatMessage(messages.navbar_watchlist)}</NavLink>
						</nav>
						<div className="navbar-right-section">
							<SearchForm />	
						</div>
						
					</div>
					
					<RegLogUser user={this.state.user} logOut={this.logOut}/>
					<LangSelector />
					<span className="navbar-toggler-search-btn" onClick={this.navbarToggle}>
						{this.state.isOpen ? <FontAwesome name='times' className="fa-yellow" style={{fontSize: '18px'}} /> :
						<FontAwesome name='search' className="fa-yellow" style={{fontSize: '18px'}} />
						}
					</span>
					<span className="drawer-toggler-btn" onClick={this.drawerToggle}>
						<FontAwesome name='bars' className="fa-yellow" style={{fontSize: '18px'}}  />
					</span>
					

					<div className={navClasses}>
						<div className="dropdown-search-wrap">
							<SearchForm />
						</div>
					</div>
					<Drawer
					 navElems={this.props.children} 
					 drawerToggle={this.drawerToggle}
					 drawerOpen={this.state.drawerOpen}
					 user={this.state.user} 
					 logOut={this.logOut}
					 handleClickOutside={this.handleClickOutside}
					/>
				</div>
				
			
			
		)
	}
	
}

export default injectIntl(Navbar);
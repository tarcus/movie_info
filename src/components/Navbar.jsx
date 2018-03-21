import React,{Component} from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import LangSelector from './LangSelector'
import {Link, NavLink} from 'react-router-dom'
import SearchForm from './SearchForm'
import Drawer from './Drawer'
import RegLogUser from './RegLogUser'


class Navbar extends Component {
	constructor(props){
		super(props);

		this.state = {isOpen: false, drawerOpen: true, userName: ''};
	}

	navbarToggle =()=>{
		this.setState({isOpen: !this.state.isOpen});
	}

	drawerToggle = ()=>{
		this.setState({drawerOpen: !this.state.drawerOpen})
	}
	
	//USER RELATED
	logOut = ()=>{
		firebase.auth().signOut();
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
							<NavLink to="/watchlist">Watchlist</NavLink>
						</nav>
						<div className="navbar-right-section">
							<SearchForm />	
						</div>
						
					</div>
					
					<RegLogUser userName={this.state.userName} logOut={this.logOut}/>
					<LangSelector />
					<span className="navbar-toggler-search-btn" onClick={this.navbarToggle}>
						<FontAwesome name='search' className="fa-yellow" style={{fontSize: '18px'}} />
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
					 user={this.state.userName} 
					 logOut={this.logOut}
					/>
				</div>
				
			
			
		)
	}
	
}

export default Navbar;
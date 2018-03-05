import React,{Component} from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import LangSelector from './LangSelector'
import {Link} from 'react-router-dom'
import SearchForm from './SearchForm'
import Drawer from './Drawer'


class Navbar extends Component {
	constructor(props){
		super(props);

		this.state = {isOpen: false, drawerOpen: true};
	}

	navbarToggle =()=>{
		this.setState({isOpen: !this.state.isOpen});
	}

	drawerToggle = ()=>{
		this.setState({drawerOpen: !this.state.drawerOpen})
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
						</nav>
						<div className="navbar-right-section">
							<SearchForm />	
						</div>
						
					</div>
					
					<div className="login">
							<a href="#"><FontAwesome name='pencil-square' style={{color: '#D5BD17'}} /> Register</a>
							<a href="#"><FontAwesome name='sign-in' style={{color: '#D5BD17'}} /> Login</a>
					</div>
					<LangSelector />
					<span className="navbar-toggler-search-btn" onClick={this.navbarToggle}>
						<FontAwesome name='search' style={{color: '#D5BD17', fontSize: '18px'}} />
					</span>
					<span className="drawer-toggler-btn" onClick={this.drawerToggle}>
						<FontAwesome name='bars' style={{color: '#D5BD17', fontSize: '18px' }}  />
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
					/>
				</div>
				
			
			
		)
	}
	
}

export default Navbar;
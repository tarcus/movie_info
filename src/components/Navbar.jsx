import React,{Component} from 'react'
import FontAwesome from 'react-fontawesome'
import classNames from 'classnames'
import LangSelector from './LangSelector'
import {Link} from 'react-router-dom'

class Navbar extends Component {
	constructor(props){
		super(props);

		this.state = {isOpen: false};
	}

	navbarToggle =()=>{
		this.setState({isOpen: !this.state.isOpen});
	}

	render(){
		const navClasses = classNames({
			'navbar-expand': true,
			'close' : !this.state.isOpen
		})

		return(
			<div>
				<div className="navbar">
					<span className="navbar-logo">
						<Link to="/"></Link>
					</span>
					<nav className="navigation">
						{this.props.children}
					</nav>
					<LangSelector />
					<nav className="login">
						<a href="#"><FontAwesome name='pencil-square' style={{color: '#D5BD17'}} />  Register</a>
						<a href="#"><FontAwesome name='sign-in' style={{color: '#D5BD17'}} /> Login</a>
					</nav>
					<span className="navbar-toggler" onClick={this.navbarToggle}>
					<FontAwesome name='bars' style={{color: '#D5BD17'}} />
					</span>
					
				</div>
				<div className={navClasses}>
					<nav>
						{this.props.children}
					</nav>
				</div>
			</div>
			
		)
	}
	
}

export default Navbar;
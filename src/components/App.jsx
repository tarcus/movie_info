import React, {Component} from 'react';
import '../css/style.css';
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'
import {defineMessages, injectIntl} from 'react-intl'
import {NavLink} from 'react-router-dom'
import Main from './Main'
import FontAwesome from 'react-fontawesome'

const messages = defineMessages({
	nav_about: {
		id: 'navbar_about.nav',
		defaultMessage: 'Actors'
	},
	nav_movies: {
		id: 'navbar_movies.nav',
		defaultMessage: 'Movies'
	},
	nav_series: {
		id: 'navbar_series.nav',
		defaultMessage: 'Series'
	},
	nav_home: {
		id: 'navbar_home.nav',
		defaultMessage: 'Home'
	}
})


class App extends Component {
	render(){
		return (
			<div>
				<Navbar>
					<NavLink exact to="/"><FontAwesome name='home' className="fa-drawer-nav fa-drawer-home"/>{this.props.intl.formatMessage(messages.nav_home)}</NavLink>
					<NavLink to="/movies"><FontAwesome name='film' className="fa-drawer-nav"/>{this.props.intl.formatMessage(messages.nav_movies)}</NavLink>
					<NavLink to="/series"><FontAwesome name='tv' className="fa-drawer-nav"/>{this.props.intl.formatMessage(messages.nav_series)}</NavLink>
					<NavLink to="/actors"><FontAwesome name='users' className="fa-drawer-nav"/>{this.props.intl.formatMessage(messages.nav_about)}</NavLink>
				</Navbar>
				<Header />
				<Main />
				<Footer />
			</div>

		)
	}
}

export default injectIntl(App);
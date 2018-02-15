import React from 'react'
import {Switch, Route} from 'react-router-dom'
import About from './About'
import SearchMovie from './SearchMovie'
import Movies from './Movies'
import Movie from './Movie'
import Series from './Series'
import Title from './Title'
import NotFound from './NotFound'
import Actors from './Actors'

const Main = ()=>{
	return(
		<main className="main">
			<Switch>
				<Route exact path='/' component={SearchMovie} />
				<Route path='/about' component={About} />
				<Route exact path='/movies' component={Movies} />
				<Route path='/movies/:id' component={Movie} />
				<Route path='/series' component={Series} />
				<Route path='/title' component={Title} />
				<Route path='/actors/:id' component={Actors} />
				<Route component={NotFound} />
			</Switch>
		</main>
	)
}

export default Main;
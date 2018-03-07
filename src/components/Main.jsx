import React from 'react'
import {Switch, Route} from 'react-router-dom'
import About from './About'
import Home from './Home'
import Movies from './Movies'
import Movie from './Movie'
import Series from './Series'
import NotFound from './NotFound'
import Actors from './Actors'
import Search from './Search'
import TV from './TV'
import ActorsAll from './ActorsAll'
 
const Main = ()=>{
	return(
		<main className="main">
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/search' component={Search} />
				<Route exact path='/movies' render={()=>{ return <Movies tv={false} />}} />
				<Route path='/movies/:id' component={Movie} />
				<Route exact path='/series' render={()=>{ return <Series tv={true} />}} />
				<Route path='/series/:id' component={TV} />
				<Route exact path='/actors' component={ActorsAll} />
				<Route path='/actors/:id' component={Actors} />
				<Route component={NotFound} />
			</Switch>
		</main>
	)
}

export default Main;
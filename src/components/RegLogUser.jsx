import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

class RegLogUser extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		//отслеживаем состояние юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({userName: user.displayName})
				console.log('FirebaseUser index.js', user)
			} else {
				console.log('not logged in')
			}
		})

	}

	render(){
		const user = this.state.userName;
		if(this.state.userName){
			return(
				<div className="login">
					<a href="#"><FontAwesome name='user-circle' style={{color: '#D5BD17'}} /> {user}</a>
				</div>
			)
				
		} else {
			return(
				<div className="login">
					<Link to="/register"><FontAwesome name='pencil-square' style={{color: '#D5BD17'}} /> Register</Link>
					<Link to="/login"><FontAwesome name='sign-in' style={{color: '#D5BD17'}} /> Login</Link>
				</div>
			)
		}

		
	}
}

export default RegLogUser;
import React,{Component} from 'react'

class AddToWatchList extends Component {
	constructor(props){
		super(props);
		this.state = {inWatchList: false}
	}

	AddToWatchList = ()=>{
		const movie = this.props.movie;	
		console.log('Add to watch list id: ', movie.id)
		//ссылка на коллекцию муви
		const watchListMovRef = firebase.database().ref('watchlist_mov')

		//Ссылка на  муви коллекцию текущего юзера
		//получаем uid юзера
		const userUid = firebase.auth().currentUser.uid
		const usersMovRef = watchListMovRef.child(userUid)

		//id текущего фильма будет нашим key
		usersMovRef.child(movie.id).set({
			id: movie.id,
			name: movie.title,
			img: movie.poster_path
		})
	
	}

	checkMovie = (movieId)=>{
		firebase.database().ref('watchlist_mov/' + this.state.userUid + '/' + movieId).on('value', (snap)=>{
					console.log('SNAP: ', snap.val())
			//если фильм уже в watchlist'e то обновим стейт
			if(snap.val()!==null){
				this.setState({inWatchList: true})
			} else {
				this.setState({inWatchList: false})
			}
		})
		
	}

	componentDidMount(){
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({userUid: user.uid})
				console.log('FirebaseUser ADDTO: ', user)
				//Проверяем есть ли у юзера этот мув
				this.checkMovie(this.props.movie.id);
				
			} else {
				this.setState({userUid: null})
				console.log('not logged in AddToWatch')
			}
		})

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.movie.id !==this.props.movie.id){
			this.checkMovie(nextProps.movie.id)
		}
		
	}

	render(){
		return(
			<div>
				<button className="watchlist-add-btn" onClick={this.AddToWatchList} disabled={this.state.inWatchList}>
					{this.state.inWatchList ? 'IN WATCHLIST' : 'ADD TO WATCHLIST'} 
				</button>
			</div>
		)
	}
}

export default AddToWatchList;
import React,{Component} from 'react'

class AddToWatchList extends Component {
	constructor(props){
		super(props);

		this.state = {inWatchList: false}
	}

	AddToWatchList = ()=>{

		const movie = this.props.movie;

		// firebase.database().ref('watchlist_mov').push({			
		// 			title: 'I dont',
		// 			cover: 'afsgfgfasd.jpeg'	
		// })
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
			title: movie.title,
			poster: movie.poster_path
		})

		//образец 
		// usersRef.child("alanisawesome").set({
		//   date_of_birth: "June 23, 1912",
		//   full_name: "Alan Turing"
		// });




	}

	checkMovie = (movieId)=>{
		firebase.database().ref('watchlist_mov/' + this.state.userUid + '/' + movieId).on('value', (snap)=>{
					console.log('SNAP: ', snap.val())
			//если фильм уже в watchlist'e то обновим стейт
			if(snap.val()!==null){
				this.setState({inWatchList: true})
			}
		})

		
	}

	componentDidMount(){
		//необходимо проверить есть ли текущий фильм в watchlist'e 
		//запрос ниже вернет всю коллекцию текущего пользователя
		// firebase.database().ref('watchlist_mov/' + 'uid_1').once('value')
		// .then((snap)=>{
		// 	console.log('FIREBASE: ', snap.val())
		// })
		//const userUid = firebase.auth().currentUser.uid
		//console.log('USER: ', userUid)
		//Нужно посмотреть есть ли у юзера текущий фильм
		//firebase.database().ref('watchlist_mov/' + userUid + '/' + this.props.movie.id)
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({userUid: user.uid})
				console.log('FirebaseUser ADDTO: ', user)
				//Нужно посмотреть есть ли у юзера текущий фильм
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
			<div className="watchlist-add" onClick={this.AddToWatchList}>
				{this.state.inWatchList ? 'inWatchList' : 'Add to watchlist'}
			</div>
		)
	}
}

export default AddToWatchList;
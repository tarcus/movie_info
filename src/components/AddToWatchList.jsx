import React,{Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	addtowatchlist_in_watchlist: {
		id: 'addtowatchlist.in_watchlist',
		defaultMessage: 'IN WATCHLIST'
	},
	addtowatchlist_add_to_watchlist: {
		id: 'addtowatchlist.add_to_watchlist',
		defaultMessage: 'ADD TO WATCHLIST'
	},
	addtowatchlist_btn_title: {
		id: 'addtowatchlist.btn_title',
		defaultMessage: 'Please register to be able to add movies in your watchlist'
	},
}) 

class AddToWatchList extends Component {
	constructor(props){
		super(props);
		this.state = {inWatchList: false}
	}

	AddToWatchList = ()=>{
		//Получаем значение счетчика
		firebase.database().ref('watchlist_mov_count/' + this.state.userUid + '/counter').once('value', (snap)=>{

			const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.userUid)
			
			
			//Ссылка на  муви коллекцию текущего юзера
			const usersMovRef = firebase.database().ref('watchlist_mov/' + this.state.userUid)
			const movie = this.props.movie;

			if(snap.val()!==null && snap.val()<5){	
				//increment counter when add to watchlist
				//const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.userUid)
				console.log('COUNTER: ', snap.val())
				let counter = snap.val()
				usersMovCountRef.child('counter').set(++counter)

				//add movie to watchlist
				//id текущего фильма будет key
				usersMovRef.child(movie.id).set({
					id: movie.id,
					name: movie.title,
					img: movie.poster_path
				})

			} else if(snap.val()==null) {
				//initial
				//const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.userUid)
				usersMovCountRef.child('counter').set(1)

				//add movie to watchlist when it is first 
				usersMovRef.child(movie.id).set({
					id: movie.id,
					name: movie.title,
					img: movie.poster_path
				})

			} else {
				//limit exceed
				this.setState({limitExceed: true})
			}
		})	
	}

	//AddToWatchList = ()=>{
		// const movie = this.props.movie;	
		// //ссылка на коллекцию муви
		// const watchListMovRef = firebase.database().ref('watchlist_mov')
		// //Ссылка на  муви коллекцию текущего юзера
		// const userUid = firebase.auth().currentUser.uid
		// const usersMovRef = watchListMovRef.child(userUid)
		// //id текущего фильма будет нашим key
		// usersMovRef.child(movie.id).set({
		// 	id: movie.id,
		// 	name: movie.title,
		// 	img: movie.poster_path
		// })
		
		//this.watchlistCounter()

	//}

	
	checkMovie = (movieId)=>{
		firebase.database().ref('watchlist_mov/' + this.state.userUid + '/' + movieId).on('value', (snap)=>{
			//console.log('SNAP: ', snap.val())
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
				//console.log('FirebaseUser ADDTO: ', user)
				//Проверяем есть ли у юзера этот мув
				this.checkMovie(this.props.movie.id);	
			} else {
				this.setState({userUid: null, inWatchList: false})
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
			<div title={!this.state.userUid ? this.props.intl.formatMessage(messages.addtowatchlist_btn_title) : ''}>
				<button className="watchlist-add-btn" onClick={this.AddToWatchList} disabled={this.state.inWatchList || !this.state.userUid}>
					{this.state.inWatchList ? this.props.intl.formatMessage(messages.addtowatchlist_in_watchlist) : this.props.intl.formatMessage(messages.addtowatchlist_add_to_watchlist)} 
				</button>
			</div>
		)
	}
}

export default injectIntl(AddToWatchList);
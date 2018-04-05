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
	addtowatchlist_limit_error: {
		id: 'addtowatchlist.limit_error',
		defaultMessage: 'You have exceeded the watchlist size limit!'
	},
}) 

class AddToWatchList extends Component {
	constructor(props){
		super(props);
		this.state = {inWatchList: false}
	}


	getSessionMovId = ()=>{
		//get session_mov_id from localstorage
		const sessionMovId = localStorage.getItem('session_mov_id');

		//ref to session_mov_id in the firebase
		const sessionMovIdRef = firebase.database().ref('session_mov_id/'  + this.state.userUid)
		
		//if there no session_mov_id, create it
		if(!sessionMovId){
			const genId = Math.random().toString(34).slice(-8);
			//Set smid to localStorage
			localStorage.setItem('session_mov_id', genId)

			//Set smid in db
			sessionMovIdRef.child('smid').set(genId)
		} else {
			//Set smid in db
			sessionMovIdRef.child('smid').set(sessionMovId)
		}
			
	}

	AddToWatchList = ()=>{
		//Получаем значение счетчика добавленных элементов (для сортировки по добавлению в список)
		firebase.database().ref('watchlist_mov_sort_count/'  + this.state.userUid + '/sid').once('value', (res)=>{
			let sid = res.val();
			//console.log("SID: ", sid)

			//Получаем значение счетчика лимита
			firebase.database().ref('watchlist_mov_count/' + this.state.userUid + '/counter').once('value', (snap)=>{
				const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.userUid)

				//ссылка на sid
				const usersMovSortRef = firebase.database().ref('watchlist_mov_sort_count/'  + this.state.userUid)
				
				//Ссылка на  муви коллекцию текущего юзера
				const usersMovRef = firebase.database().ref('watchlist_mov/' + this.state.userUid)
				const movie = this.props.movie;

				if(snap.val()!==null && snap.val()<126){	
					//increment counter when add to watchlist
					console.log('COUNTER: ', snap.val())
					let counter = snap.val()
					usersMovCountRef.child('counter').set(++counter)
					//set smid
					this.getSessionMovId()

					//инкрементируем sid
					usersMovSortRef.child('sid').set(++sid)
					.then(()=>{
						//add movie to watchlist
						usersMovRef.child(movie.id).set({
							id: movie.id,
							name: movie.title,
							img: movie.poster_path,
							sid: sid
						})
					})
					
				} else if(snap.val()==null) {
					//initial
					usersMovCountRef.child('counter').set(1)
					usersMovSortRef.child('sid').set(1)

					//set smid
					this.getSessionMovId()
					
					//add movie to watchlist when it's first 
					usersMovRef.child(movie.id).set({
						id: movie.id,
						name: movie.title,
						img: movie.poster_path,
						sid: 1
					})
				} else {
					//limit exceed
					this.setState({limitExceed: true})
				}
			})	

		})
		
	}

	
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
				//check whether user has this movie or not
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
		const exceedErr = this.props.intl.formatMessage(messages.addtowatchlist_limit_error)
		return(
			<div title={!this.state.userUid ? this.props.intl.formatMessage(messages.addtowatchlist_btn_title) : ''}>
				<button className="watchlist-add-btn" onClick={this.AddToWatchList} disabled={this.state.inWatchList || !this.state.userUid || this.state.limitExceed}>
					{this.state.inWatchList ? this.props.intl.formatMessage(messages.addtowatchlist_in_watchlist) : this.props.intl.formatMessage(messages.addtowatchlist_add_to_watchlist)} 
				</button>
				<div className="exceed-err">{this.state.limitExceed ? exceedErr : ''}</div>
			</div>
		)
	}
}

export default injectIntl(AddToWatchList);
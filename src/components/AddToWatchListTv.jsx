import React,{Component} from 'react'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	addtowatchlisttv_in_watchlist: {
		id: 'addtowatchlisttv.in_watchlist',
		defaultMessage: 'IN WATCHLIST'
	},
	addtowatchlisttv_add_to_watchlist: {
		id: 'addtowatchlisttv.add_to_watchlist',
		defaultMessage: 'ADD TO WATCHLIST'
	},
	addtowatchlisttv_btn_title: {
		id: 'addtowatchlisttv.btn_title',
		defaultMessage: 'Please register to be able to add movies and TV Shows in your watchlist'
	},
	addtowatchlisttv_limit_error: {
		id: 'addtowatchlisttv.limit_error',
		defaultMessage: 'You have exceeded the watchlist size limit!'
	},
}) 

class AddToWatchListTv extends Component {
	constructor(props){
		super(props);
		this.state = {inWatchList: false}
	}


	getSessionTvId = ()=>{
		//get session_tv_id from localstorage
		const sessionTvId = localStorage.getItem('session_tv_id');

		//ref to session_tv_id in the firebase
		const sessionTvIdRef = firebase.database().ref('session_tv_id/'  + this.state.userUid)
		
		//if there no session_tv_id, create it
		if(!sessionTvId){
			const genId = Math.random().toString(34).slice(-8);
			//Set smid to localStorage
			localStorage.setItem('session_tv_id', genId)

			//Set smid in db
			sessionTvIdRef.child('smid').set(genId)
		} else {
			//Set smid in db
			sessionTvIdRef.child('smid').set(sessionTvId)
		}
			
	}

	AddToWatchList = ()=>{
		//Получаем значение счетчика добавленных элементов (для сортировки по добавлению в список)
		firebase.database().ref('watchlist_tv_sort_count/'  + this.state.userUid + '/sid').once('value', (res)=>{
			let sid = res.val();
			//console.log("SID: ", sid)

			//Получаем значение счетчика лимита
			firebase.database().ref('watchlist_tv_count/' + this.state.userUid + '/counter').once('value', (snap)=>{
				const usersTvCountRef = firebase.database().ref('watchlist_tv_count/' + this.state.userUid)

				//ссылка на sid
				const usersTvSortRef = firebase.database().ref('watchlist_tv_sort_count/'  + this.state.userUid)
				
				//Ссылка на  муви коллекцию текущего юзера
				const usersTvRef = firebase.database().ref('watchlist_tv/' + this.state.userUid)
				const tv = this.props.tv;

				if(snap.val()!==null && snap.val()<126){	
					//increment counter when add to watchlist
					//console.log('COUNTER: ', snap.val())
					let counter = snap.val()
					usersTvCountRef.child('counter').set(++counter)
					//set smid
					this.getSessionTvId()

					//инкрементируем sid
					usersTvSortRef.child('sid').set(++sid)
					.then(()=>{
						//add tv to watchlist
						usersTvRef.child(tv.id).set({
							id: tv.id,
							name: tv.name,
							img: tv.poster_path,
							sid: sid
						})
					})
					
				} else if(snap.val()==null) {
					//initial
					usersTvCountRef.child('counter').set(1)
					usersTvSortRef.child('sid').set(1)

					//set smid
					this.getSessionTvId()
					
					//add tv to watchlist when it's first 
					usersTvRef.child(tv.id).set({
						id: tv.id,
						name: tv.name,
						img: tv.poster_path,
						sid: 1
					})
				} else {
					//limit exceed
					this.setState({limitExceed: true})
				}
			})	

		})
		
	}

	
	checkTv = (TvId)=>{
		firebase.database().ref('watchlist_tv/' + this.state.userUid + '/' + TvId).on('value', (snap)=>{
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
				//check whether user has this tv or not
				this.checkTv(this.props.tv.id);	
			} else {
				this.setState({userUid: null, inWatchList: false})
				console.log('not logged in AddToWatch')
			}
		})
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.tv.id !==this.props.tv.id){
			this.checkTv(nextProps.tv.id)
		}	
	}

	render(){
		const exceedErr = this.props.intl.formatMessage(messages.addtowatchlisttv_limit_error)
		return(
			<div title={!this.state.userUid ? this.props.intl.formatMessage(messages.addtowatchlisttv_btn_title) : ''}>
				<button className="watchlist-add-btn" onClick={this.AddToWatchList} disabled={this.state.inWatchList || !this.state.userUid || this.state.limitExceed}>
					{this.state.inWatchList ? this.props.intl.formatMessage(messages.addtowatchlisttv_in_watchlist) : this.props.intl.formatMessage(messages.addtowatchlisttv_add_to_watchlist)} 
				</button>
				<div className="exceed-err">{this.state.limitExceed ? exceedErr : ''}</div>
			</div>
		)
	}
}

export default injectIntl(AddToWatchListTv);
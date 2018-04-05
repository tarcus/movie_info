import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontAwesome from 'react-fontawesome'
import {defineMessages, injectIntl} from 'react-intl'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
import queryString from 'query-string'
import merge from 'deepmerge'
//import LazyLoad from 'react-lazyload';

//i18n
const messages = defineMessages({
	watchlist_remove_item: {
		id: 'watchlist.remove_item_title',
		defaultMessage: 'Remove from watchlist'
	},
	watchlist_watch_outside: {
		id: 'watchlist.watch_outside_title',
		defaultMessage: 'Search Movie Outside'
	},
	watchlist_tab_movie_title: {
		id: 'watchlist.tab_movie_title',
		defaultMessage: 'Movies Watchlist'
	},
	watchlist_tab_tv_title: {
		id: 'watchlist.tab_tv_title',
		defaultMessage: 'TV Show Watchlist'
	},
	watchlist_btn_load_more: {
		id: 'watchlist.btn_load_more',
		defaultMessage: 'Load More'
	},
	watchlist_btn_done: {
		id: 'watchlist.btn_done',
		defaultMessage: 'Done'
	},
	watchlist_guest: {
		id: 'watchlist.guest',
		defaultMessage: 'Register or sign in, then you will be able to add movies in your watchlist. And watch them later.'
	}
}) 

class WatchList extends Component {
	constructor(props){
		super(props);
		this.state = {movList: [], tvList: [], outerLink: '', hasMore: true}
	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const topEl = document.querySelector('.react-tabs__tab-list')	
			scrollIntoViewIfNeeded(topEl, { duration: 500, easing: 'ease', offset: {top: -5}})
		}, 350)	
	}

	getSessionMovId = ()=>{
		//get session_mov_id from localstorage
		const sessionMovId = localStorage.getItem('session_mov_id');
		//ref to session_mov_id in the firebase
		const sessionMovIdRef = firebase.database().ref('session_mov_id/'  + this.state.uid)	
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

	
	getMore = ()=>{
		const lastItem = this.state.movList.slice(-1)[0];
		const start = lastItem ? lastItem.sid + 1 : 1;
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid).orderByChild('sid').startAt(start).limitToFirst(42);
		movListRef.once('value', (snap)=>{
			//console.log('LOAD MORE: ', snap.val())
			if(snap.val()!==null){
				const dataOrdered = [];
				snap.forEach((item)=>{
					dataOrdered.push(item.val())
				})
				//check for more items
				const hasMore = (dataOrdered.length < 42) ? false : true;
				
				this.setState({movList: [...this.state.movList , ...dataOrdered], hasMore: hasMore }, ()=>{
					//update localStorage
					localStorage.setItem('watchlist_mov_' + this.state.uid, JSON.stringify(this.state.movList))
				})
			} else {
				this.setState({hasMore: false})
			}
		})
	}

	
	//get first portion of content
	getInit = ()=>{	
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid).orderByChild('sid').startAt(0).limitToFirst(42);
		movListRef.once('value', (snap)=>{
			if(snap.val()!==null){
				const dataOrdered = [];
				snap.forEach((item)=>{
					dataOrdered.push(item.val())
				})
				console.log('DATA ORDERED: ', dataOrdered)
				this.setState({movList: dataOrdered}, ()=>{
					//save to localStorage
					localStorage.setItem('watchlist_mov_' + this.state.uid, JSON.stringify(this.state.movList))
					
					//update smid in db to prevent multiple data fetching from firebase
					const sessionMovId = localStorage.getItem('session_mov_id');
					const sessionMovIdRef = firebase.database().ref('session_mov_id/'  + this.state.uid)
					sessionMovIdRef.child('smid').set(sessionMovId)
				})
			} else {
				this.setState({movList: []})
			}
		})	
	}

	getInitFromLocal = ()=>{
		//Loading data from localStorage
		const movFromLocal = JSON.parse(localStorage.getItem('watchlist_mov_' + this.state.uid))

		if(movFromLocal!==null){
			this.setState({movList: movFromLocal})
			console.log('DATA FROM LOCALSTORAGE')
		} else {
			this.setState({movList: []})
		}
	}

	delMovFromList = (e, movId)=>{
		//remove movie from list by id
		firebase.database().ref('watchlist_mov/' + this.state.uid + '/' + movId).remove()
		//console.log('DEL FROM WATCHLIST: ', movId)

		//И чтобы не тянуть из бд очередной раз все 
		//удалим из стейта этот элемент массива
		const afterDel = this.state.movList.filter((item)=>{
			return item.id !== movId
		})
		this.setState({movList: afterDel}, ()=>{
			//update localStorage
			localStorage.setItem('watchlist_mov_' + this.state.uid, JSON.stringify(this.state.movList))
		})

		//Get counter value and decrement it
		firebase.database().ref('watchlist_mov_count/' + this.state.uid + '/counter').once('value', (snap)=>{
			const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.uid)
				//console.log('COUNTER: ', snap.val())
				let counter = snap.val()
				usersMovCountRef.child('counter').set(--counter)
		})
		//set smid to db
		this.getSessionMovId()
	}

	getOuterLinks = ()=>{
		//Получаем из БД ссылку на внешний сайт в зависимости от выбранного языка
		firebase.database().ref('outerLinks/' + this.props.intl.locale).once('value')
		.then((snap)=>{
			this.setState({outerLink: snap.val().link})
		})
		.catch((error)=>{
			console.log('DB OuterLinks Error: ', error)
		})	
	}

	componentDidMount(){
		//получаем юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({uid: user.uid}, ()=>{
					//get session_mov_id from localstorage
					const sessionMovId = localStorage.getItem('session_mov_id');
					//ref to session_mov_id in the firebase
					firebase.database().ref('session_mov_id/'  + this.state.uid + '/smid').once('value', (snap)=>{	
						const movFromLocal = JSON.parse(localStorage.getItem('watchlist_mov_' + this.state.uid))
						if(sessionMovId===snap.val() && movFromLocal!==null && movFromLocal.length!==0){
							this.getInitFromLocal()
						} else {
							this.getInit()
						}	
					})
					this.getOuterLinks()
				})
			} else {
				this.setState({uid: ''})
			}
		})

	}

	componentWillUnmount(){
		//Detach firebase listeners
		firebase.database().ref('watchlist_mov/' + this.state.uid).off('child_removed')
	}

	render(){
		//console.log("WATCHLIST RENDER")
		const user = this.state.uid;
		const guest = <div>{this.props.intl.formatMessage(messages.watchlist_guest)}</div>
		const movList = this.state.movList.map((item)=>{
			return  <div className="watchlist-card" key={item.id}>
						<Link to={`/movies/${item.id}`}>
							{/*<LazyLoad height={228} offset={200} throttle={200} once>*/}
								<img src={`https://image.tmdb.org/t/p/w154/${item.img}`}/>
							{/*</LazyLoad>	*/}
						</Link>
						<div title={this.props.intl.formatMessage(messages.watchlist_remove_item)} 
							className="watchlist-del-btn translucent-bg" 
							onClick={(e)=>{this.delMovFromList(e, item.id)}}
						>
							<span>&times;</span>
						</div>
						<a href={`${this.state.outerLink}${item.name}`} 
						className="watch-outside-link translucent-bg" 
						target="_blank"
						title={this.props.intl.formatMessage(messages.watchlist_watch_outside)}
						>
							<FontAwesome name='eye' className="fa-del-btn" />
						</a>
						<div className="watchlist-card-overlay">
							{item.name}
						</div>
					</div>
		})

		return(
			<div className="home row">
				<div className="home-col-1">
					<Tabs onSelect={index => console.log(index)}>
					    <TabList>
					      <Tab>{this.props.intl.formatMessage(messages.watchlist_tab_movie_title)}</Tab>
					      <Tab>{this.props.intl.formatMessage(messages.watchlist_tab_tv_title)}</Tab>
					    </TabList>
					 
					    <TabPanel>
					      {/*<h2>Any content 1</h2>*/}
					      <div className="row">{user ? movList : guest}

					      {user && this.state.movList.length>0 && <div className="flex-100 row">
						      <button className="watchlist-add-btn watchlist-more-btn" onClick={this.getMore} disabled={!this.state.hasMore}>
						      	{this.state.hasMore ? this.props.intl.formatMessage(messages.watchlist_btn_load_more) : this.props.intl.formatMessage(messages.watchlist_btn_done)}
						      </button>
					      	</div>
					      }
					      	
					      </div>  
					    </TabPanel>
					    <TabPanel>
					      {/*<h2>Any content 2</h2>*/}
					    </TabPanel>
					</Tabs>
				</div>
			</div>
		)
	}
}

export default withRouter(injectIntl(WatchList));
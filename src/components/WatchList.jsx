import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontAwesome from 'react-fontawesome'
import {defineMessages, injectIntl} from 'react-intl'
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed'
//import LazyLoad from 'react-lazyload';
import FlipMove from 'react-flip-move';
import {genKey} from '../utils/helpers'

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
	},
	watchlist_watch_outside_tv: {
		id: 'watchlist.watch_outside_title_tv',
		defaultMessage: 'Search TV Show Outside'
	}
}) 

class WatchList extends Component {
	constructor(props){
		super(props);
		this.state = {movList: [], tvList: [], outerLink: '', hasMore: true, hasMoreTv: true}
	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const topEl = document.querySelector('.react-tabs__tab-list')	
			scrollIntoViewIfNeeded(topEl, { duration: 500, easing: 'ease', offset: {top: -5}})
		}, 350)	
	}

	getTotalMovItems = ()=>{
		firebase.database().ref('watchlist_mov_count/' + this.state.uid + '/counter').once('value')
		.then((snap)=>{
			//Load recently added
			if(this.state.movList.length < snap.val()){
				this.getMore()
				//console.log("NEED LOAD MORE")
			}
			//console.log('TOTAL MOV: ', snap.val())
		})
		.catch((error)=>{
			console.log('DB Error: ', error)
		})	
	}

	getTotalTvItems = ()=>{
		firebase.database().ref('watchlist_tv_count/' + this.state.uid + '/counter').once('value')
		.then((snap)=>{
			//Load recently added
			if(this.state.tvList.length < snap.val()){
				this.getMoreTv()
				//console.log("NEED LOAD MORE TV")
			}
			//console.log('TOTAL TV: ', snap.val())
		})
		.catch((error)=>{
			console.log('DB Error: ', error)
		})	
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

	getSessionTvId = ()=>{
		const sessionTvId = localStorage.getItem('session_tv_id');
		const sessionTvIdRef = firebase.database().ref('session_tv_id/'  + this.state.uid)	
		if(!sessionTvId){
			const genId = Math.random().toString(34).slice(-8);
			localStorage.setItem('session_tv_id', genId)
			sessionTvIdRef.child('smid').set(genId)
		} else {
			sessionTvIdRef.child('smid').set(sessionTvId)
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

	getMoreTv = ()=>{
		const lastItem = this.state.tvList.slice(-1)[0];
		const start = lastItem ? lastItem.sid + 1 : 1;
		const tvListRef = firebase.database().ref('watchlist_tv/' + this.state.uid).orderByChild('sid').startAt(start).limitToFirst(42);
		tvListRef.once('value', (snap)=>{
			//console.log('LOAD MORE: ', snap.val())
			if(snap.val()!==null){
				const dataOrdered = [];
				snap.forEach((item)=>{
					dataOrdered.push(item.val())
				})
				const hasMore = (dataOrdered.length < 42) ? false : true;
				this.setState({tvList: [...this.state.tvList , ...dataOrdered], hasMoreTv: hasMore }, ()=>{
					localStorage.setItem('watchlist_tv_' + this.state.uid, JSON.stringify(this.state.tvList))
				})
			} else {
				this.setState({hasMoreTv: false})
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
				//console.log('DATA ORDERED: ', dataOrdered)
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

	getInitTv = ()=>{	
		const tvListRef = firebase.database().ref('watchlist_tv/' + this.state.uid).orderByChild('sid').startAt(0).limitToFirst(42);
		tvListRef.once('value', (snap)=>{
			if(snap.val()!==null){
				const dataOrdered = [];
				snap.forEach((item)=>{
					dataOrdered.push(item.val())
				})
				//console.log('DATA ORDERED TV: ', dataOrdered)
				this.setState({tvList: dataOrdered}, ()=>{
					//save to localStorage
					localStorage.setItem('watchlist_tv_' + this.state.uid, JSON.stringify(this.state.tvList))
					
					//update smid in db to prevent multiple data fetching from firebase
					const sessionTvId = localStorage.getItem('session_tv_id');
					const sessionTvIdRef = firebase.database().ref('session_tv_id/'  + this.state.uid)
					sessionTvIdRef.child('smid').set(sessionTvId)
				})
			} else {
				this.setState({tvList: []})
			}
		})	
	}

	getInitFromLocal = ()=>{
		//Loading data from localStorage
		const movFromLocal = JSON.parse(localStorage.getItem('watchlist_mov_' + this.state.uid))
			this.setState({movList: movFromLocal}, ()=>{
				//Load more if there is more
				this.getTotalMovItems()
			})
			//console.log('DATA FROM LOCALSTORAGE')	
	}

	getInitFromLocalTv = ()=>{
		//Loading data from localStorage
		const tvFromLocal = JSON.parse(localStorage.getItem('watchlist_tv_' + this.state.uid))
			this.setState({tvList: tvFromLocal}, ()=>{
				this.getTotalTvItems()
			})
	}

	delTvFromList = (e, tvId)=>{
		firebase.database().ref('watchlist_tv/' + this.state.uid + '/' + tvId).remove()
		//console.log('DEL FROM WATCHLIST: ', movId)
		const afterDel = this.state.tvList.filter((item)=>{
			return item.id !== tvId
		})
		this.setState({tvList: afterDel}, ()=>{
			//update localStorage
			localStorage.setItem('watchlist_tv_' + this.state.uid, JSON.stringify(this.state.tvList))
		})
		//Get counter value and decrement it
		firebase.database().ref('watchlist_tv_count/' + this.state.uid + '/counter').once('value', (snap)=>{
			const usersTvCountRef = firebase.database().ref('watchlist_tv_count/' + this.state.uid)
				//console.log('COUNTER: ', snap.val())
				let counter = snap.val()
				usersTvCountRef.child('counter').set(--counter)
		})
		//set smid to db
		this.getSessionTvId()
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

	

	componentDidMount(){
		//получаем юзера
		this.fireUser = firebase.auth().onAuthStateChanged((user)=>{
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

	tvTabSelect = (tabNum)=>{
		if(tabNum===1){
			//get session_mov_id from localstorage
			 const sessionTvId = localStorage.getItem('session_tv_id')
			// //ref to session_mov_id in the firebase
			 firebase.database().ref('session_tv_id/' + this.state.uid + '/smid').once('value', (snap)=>{	
			 	const tvFromLocal = JSON.parse(localStorage.getItem('watchlist_tv_' + this.state.uid))
			 	//console.log(tvFromLocal)
			 	 if(sessionTvId===snap.val() && tvFromLocal!==null && tvFromLocal.length!==0){
			 	 	this.getInitFromLocalTv()
			 	 } else {
			 	 	this.getInitTv()
			 	 }	
			 })
		}
	}

	componentWillUnmount(){
		//Detach firebase listeners
		this.fireUser();
		//firebase.database().ref('watchlist_mov/' + this.state.uid).off('child_removed')
	}

	render(){
		//console.log("WATCHLIST RENDER")
		const user = this.state.uid;
		//const guestArr = [{message: 'Fuck me'}];
		const guest = <div key={genKey()}>{this.props.intl.formatMessage(messages.watchlist_guest)}</div>
		// const guest = guestArr.map((item)=>{
		// 	return <span key={genKey()}>{item.message}</span>
		// })
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

		const tvList = this.state.tvList.map((item)=>{
			return  <div className="watchlist-card" key={item.id}>
						<Link to={`/series/${item.id}`}>
							{/*<LazyLoad height={228} offset={200} throttle={200} once>*/}
								<img src={`https://image.tmdb.org/t/p/w154/${item.img}`}/>
							{/*</LazyLoad>	*/}
						</Link>
						<div title={this.props.intl.formatMessage(messages.watchlist_remove_item)} 
							className="watchlist-del-btn translucent-bg" 
							onClick={(e)=>{this.delTvFromList(e, item.id)}}
						>
							<span>&times;</span>
						</div>
						<a href={`${this.state.outerLink}${item.name}`} 
						className="watch-outside-link translucent-bg" 
						target="_blank"
						title={this.props.intl.formatMessage(messages.watchlist_watch_outside_tv)}
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
				<div className="watchlist-col">
					<Tabs onSelect={index => this.tvTabSelect(index)}>
					    <TabList>
					      <Tab>{this.props.intl.formatMessage(messages.watchlist_tab_movie_title)}</Tab>
					      <Tab>{this.props.intl.formatMessage(messages.watchlist_tab_tv_title)}</Tab>
					    </TabList>
					 
					    <TabPanel>
					      {/*<h2>Any content 1</h2>*/}
					      <div className="row react-flip-relat">
					      	<FlipMove typeName={null}>
					         
								  {user ? movList : guest}

							      {(user && this.state.movList.length>0) ? <div className="flex-100 row">
								      <button className="watchlist-add-btn watchlist-more-btn" onClick={this.getMore} disabled={!this.state.hasMore}>
								      	{this.state.hasMore ? this.props.intl.formatMessage(messages.watchlist_btn_load_more) : this.props.intl.formatMessage(messages.watchlist_btn_done)}
								      </button>
							      	</div> 
							      	: <span></span>
							      }
					      	</FlipMove>
					      </div>  
					    </TabPanel>
					    <TabPanel>
					      {/*<h2>Any content 2</h2>*/}

					      <div className="row react-flip-relat">
					      	<FlipMove typeName={null}>
							      {user ? tvList : guest}

							      {(user && this.state.tvList.length>0) ? <div className="flex-100 row">
								      <button className="watchlist-add-btn watchlist-more-btn" onClick={this.getMoreTv} disabled={!this.state.hasMoreTv}>
								      	{this.state.hasMoreTv ? this.props.intl.formatMessage(messages.watchlist_btn_load_more) : this.props.intl.formatMessage(messages.watchlist_btn_done)}
								      </button>
							      	</div>
							      	: <span></span>
							      }
					      	</FlipMove>
					      </div>
					    </TabPanel>
					</Tabs>
				</div>
			</div>
		)
	}
}

export default withRouter(injectIntl(WatchList));
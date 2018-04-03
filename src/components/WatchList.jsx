import React,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontAwesome from 'react-fontawesome'
import {defineMessages, injectIntl} from 'react-intl'
//import Pagination from "react-js-pagination"
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
		//TotalResults сделай с ним что-то позже
		this.state = {movList: [], tvList: [], outerLink: '', totalResults: '',  hasMore: true}
	}

	
	//Этот метод потом убрать
	getTotalResults = ()=>{
		//запрос ниже вернет всю коллекцию текущего пользователя
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid)
		movListRef.once('value')
		.then((snap)=>{
			if(snap.val()!==null){
				const data = Object.values(snap.val())
				console.log('TOTAL RESULTS: ', data.length)
				this.setState({totalResults: data.length})
			} else {
				this.setState({totalResults: 0})
			}
			
		})	
	
	}

	getMore = ()=>{
		const lastItem = this.state.movList.slice(-1)[0];
		const start = lastItem ? lastItem.id + 1 : 1;
		
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid).orderByChild('id').startAt(start).limitToFirst(42);
		movListRef.once('value', (snap)=>{
			console.log('FIREBASE PAGE: ', snap.val())
			if(snap.val()!==null){
				const data = Object.values(snap.val())
				//Проверяем есть ли еще
				const hasMore = (data.length < 42) ? false : true;
	
				this.setState({movList: [...this.state.movList , ...data], hasMore: hasMore })
			} else {
				this.setState({hasMore: false})
			}
		})
	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const topEl = document.querySelector('.react-tabs__tab-list')	
			scrollIntoViewIfNeeded(topEl, { duration: 500, easing: 'ease', offset: {top: -5}})
		}, 350)	
	}


	//Этот метод тащит первую порцию при инициализации компонента
	getInit = ()=>{	
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid).orderByChild('id').startAt(0).limitToFirst(42);
		movListRef.once('value', (snap)=>{
			console.log('FIREBASE PAGE: ', snap.val())
			if(snap.val()!==null){
				const data = Object.values(snap.val())
				this.setState({movList: data})
			} else {
				this.setState({movList: []})
			}
		})	
	}

	delMovFromList = (e, movId)=>{
		//удаляем фильм из списка по id
		firebase.database().ref('watchlist_mov/' + this.state.uid + '/' + movId).remove()
		console.log('Del FROM WATCH: ', movId)

		//И чтобы не тянуть из бд очередной раз все 
		//удалим из стейта этот элемент массива
		const afterDel = this.state.movList.filter((item)=>{
			return item.id !== movId
		})
		this.setState({movList: afterDel})


		//COUNTER
		//Получаем значение счетчика и декрементируем его
		firebase.database().ref('watchlist_mov_count/' + this.state.uid + '/counter').once('value', (snap)=>{
			const usersMovCountRef = firebase.database().ref('watchlist_mov_count/' + this.state.uid)
				//console.log('COUNTER: ', snap.val())
				let counter = snap.val()
				usersMovCountRef.child('counter').set(--counter)
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

	
	componentDidMount(){
		//получаем юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({uid: user.uid}, ()=>{
					//this.getTotalResults()
					this.getInit()
					this.getOuterLinks()
					//this.getWatchList()
					console.log("Get Watchlist")
					
					//Слушаем удаления в списке УДАЛИТЬ ПОТОМ
					//Без этого firebase пишет warning в консоль
					const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid)
					movListRef.on('child_removed', (data)=>{
						console.log("Child Removed: ", data.val())
						//this.getPage();
					})

					//И добавления
					// movListRef.on('child_added', (data)=>{
					// 	console.log("Child Added: ", data.val())
						//this.getWatchList();
					// })

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
		console.log("WATCHLIST RENDER")
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
						      <button className="watchlist-add-btn" onClick={this.getMore} disabled={!this.state.hasMore}>
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
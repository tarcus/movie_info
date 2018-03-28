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
				console.log("NO MORE")
				this.setState({hasMore: false})
			}
		})
	}

	scrollPageToBegining = ()=>{
		setTimeout(()=>{const topEl = document.querySelector('.react-tabs__tab-list')	
			scrollIntoViewIfNeeded(topEl, { duration: 500, easing: 'ease', offset: {top: -5}})
		}, 350)	
	}


	//Это можно потом удалить
	// handlePageChange = (pageNumber)=> { 
	//     const pageNum = {moviepage: pageNumber};
	// 	//const paramsFromUrl = queryString.parse(location.search);

	// 	const lastItem = this.state.movList.slice(-1)[0];
	// 	const start = lastItem ? lastItem.id + 1 : 1;
	// 	console.log("LAST: ", start)
	// 	const lastItemObj = {last: start}

	// 	const mergedOptions = merge.all([pageNum, lastItemObj])
	// 	//console.log('MERGED: ', mergedOptions)

	// 	//сериализуем объект в строку параметров
	// 	const stringified = queryString.stringify(mergedOptions)
	// 	//Подготавливаем pageLast
	// 	const page = {[pageNumber]: start}
	// 	const pageMerged = merge.all([this.state.pageLast, page])
	// 	console.log('PAGE MERGED: ', pageMerged)

	// 	this.setState({pageLast: pageMerged}, ()=>{console.log("PAGELAST STATE: ", this.state)})

	// 	//Нужно запушить измененные параметры в URL
	// 	this.props.history.push(`/watchlist?${stringified}`)
	// 	this.scrollPageToBegining()
 //  	}

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
		//удаляем мув из списка по id
		firebase.database().ref('watchlist_mov/' + this.state.uid + '/' + movId).remove()
		console.log('Del FROM WATCH: ', movId)

		//И чтобы не тянуть из бд очередной раз все 
		//удалим из стейта этот элемент массива
		const afterDel = this.state.movList.filter((item)=>{
			return item.id !== movId
		})
		this.setState({movList: afterDel})
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
					this.getTotalResults()
					this.getInit()
					this.getOuterLinks()
					//this.getWatchList()
					console.log("Get Watchlist")
					
					//Слушаем удаления в списке
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
		const page = queryString.parse(location.search).moviepage || 1;
		const guest = <div>Register or sign in, then you will be able to add movies in your watchlist. And watch them later</div>
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
					      <Tab>Movies Watchlist</Tab>
					      <Tab>TV Show Watchlist</Tab>
					    </TabList>
					 
					    <TabPanel>
					      {/*<h2>Any content 1</h2>*/}
					      <div className="row">{this.state.uid ? movList : guest}</div>
					      <div>{this.state.hasMore==false && 'NO MORE'}</div>
					      <div><button onClick={this.getMore}>MORE</button></div>
					    </TabPanel>
					    <TabPanel>
					      <h2>Any content 2</h2>
					    </TabPanel>
					</Tabs>
				</div>
			</div>
		)
	}
}

export default withRouter(injectIntl(WatchList));
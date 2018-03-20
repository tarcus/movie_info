import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontAwesome from 'react-fontawesome'
import {injectIntl} from 'react-intl'

class WatchList extends Component {
	constructor(props){
		super(props);

		this.state = {movList: [], tvList: [], outerLink: ''}
	}


	getWatchList = ()=>{
		
		//запрос ниже вернет всю коллекцию текущего пользователя
		const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid)
		movListRef.once('value')
		.then((snap)=>{
			if(snap.val()!==null){
				const data = Object.values(snap.val())
				this.setState({movList: data})
			} else {
				this.setState({movList: []})
			}
			
			console.log('FIREBASE: ', snap.val())
		})

		//Слушаем удаления в списке 
		// movListRef.on('child_removed', (data)=>{
		// 	console.log("Child Removed: ", data.val())
		// })
		
		
	}

	delMovFromList = (e, movId)=>{
		//удаляем мув из списка по id
		firebase.database().ref('watchlist_mov/' + this.state.uid + '/' + movId).remove()
		console.log('Del FROM WATCH: ', movId)

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
					this.getOuterLinks()
					this.getWatchList()
					console.log("Get Watchlist")
					
					//Слушаем удаления в списке 
					const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid)
					movListRef.on('child_removed', (data)=>{
						console.log("Child Removed: ", data.val())
						this.getWatchList();
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
	
	render(){
		console.log("WATCHLIST RENDER")
		const movList = this.state.movList.map((item)=>{
			return  <div className="watchlist-card" key={item.id}>
						<Link to={`/movies/${item.id}`}>
							<img src={`https://image.tmdb.org/t/p/w154/${item.img}`}/>
						</Link>
						<span title="Remove Movie From List" 
							className="watchlist-del-btn" 
							onClick={(e)=>{this.delMovFromList(e, item.id)}}
						>
							<FontAwesome name='times' className="fa-del-btn" />
						</span>
						<a href={`${this.state.outerLink}${item.name}`} 
						className="watch-outside-link" 
						target="_blank"
						title="Search Movie Outside"
						>
							<FontAwesome name='eye' className="fa-del-btn" />
						</a>
						<div className="watchlist-card-overlay">
							{item.name}
						</div>
						{/*<div className="watchlist-card-title">
							{item.name}
						</div>*/}
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
					      <h2>Any content 1</h2>
					      <div className="row">{movList}</div>
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

export default injectIntl(WatchList);
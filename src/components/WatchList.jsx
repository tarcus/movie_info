import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontAwesome from 'react-fontawesome'

class WatchList extends Component {
	constructor(props){
		super(props);

		this.state = {movList: [], tvList: []}
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

	componentDidMount(){
		//получаем юзера
		firebase.auth().onAuthStateChanged((user)=>{
			if(user){
				this.setState({uid: user.uid}, ()=>{
					this.getWatchList()
					console.log("Get Watchlist")

					//Слушаем удаления в списке 
					const movListRef = firebase.database().ref('watchlist_mov/' + this.state.uid)
					movListRef.on('child_removed', (data)=>{
						console.log("Child Removed: ", data.val())
						this.getWatchList();
					})
				})
			} else {
				this.setState({uid: ''})
			}
		})



	}
	
	render(){
		const movList = this.state.movList.map((item)=>{
			return  <div className="watchlist-card" key={item.id}>
						<Link to={`/movies/${item.id}`}>
							<img src={`https://image.tmdb.org/t/p/w154/${item.img}`}/>
						</Link>
						<span title="Remove Movie From List" 
							className="watchlist-del-btn" 
							onClick={(e)=>{this.delMovFromList(e, item.id)}}
						>
							<FontAwesome name='ban' className="fa-del-btn" />
						</span>
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

export default WatchList;
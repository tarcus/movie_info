import React,{Component} from 'react'

class AddToWatchList extends Component {
	constructor(props){
		super(props);
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
		//укажи в скобках uid текущего юзера когда аутентификацию запилишь
		const usersMovRef = watchListMovRef.child('uid_1')

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

	componentDidMount(){
		//необходимо проверить есть ли текущий фильм в watchlist'e 
		//запрос ниже вернет всю коллекцию текущего пользователя
		// firebase.database().ref('watchlist_mov/' + 'uid_1').once('value')
		// .then((snap)=>{
		// 	console.log('FIREBASE: ', snap.val())
		// })
	}

	render(){
		return(
			<div className="watchlist-add" onClick={this.AddToWatchList}>
				Add to watchlist
			</div>
		)
	}
}

export default AddToWatchList;
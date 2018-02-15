import React,{Component} from 'react';
import SidebarItem from './SidebarItem'
import {FormattedMessage} from 'react-intl'

class Sidebar extends Component {
	constructor(props){
		super(props);
		//Если в localStorage еще нету ключа recentMovStorage то создадим его
		if(!localStorage.getItem('recentMovStorage')){
			let recentMovArr = [];
			//сохраняем массив в localStorage
			localStorage.setItem('recentMovStorage', JSON.stringify(recentMovArr))
		
		//если есть, то читаем массив из хранилища и записываем его в state
		} 

		let arrFromStorage = JSON.parse(localStorage.getItem('recentMovStorage'));

			//Пишем его в state
		this.state = {recentMov:arrFromStorage}

	}

	
	componentWillReceiveProps(nextProps){

		if(nextProps.newItem !== this.props.newItem){
			console.log('Receive Props: ', nextProps.newItem)
			//console.log('Next Props: ', nextProps.newItem)
			//Получаем новый фильм и добавляем его к массиву
			const newMovie = nextProps.newItem;

			//получаем массив из state и пушим в него newMovie 
			//последние 5 элементов массива
			const lastFiveElem = this.state.recentMov.slice(-5);
			this.setState({recentMov: [...lastFiveElem, newMovie]}, ()=>{
				//сохраним в localStorage
				localStorage.setItem('recentMovStorage', JSON.stringify(this.state.recentMov));
			});
		}
		

		 
		
	}


	render(){
		return(
		<div className="col-2">
			<h1 className="sidebar-heading">
			<FormattedMessage
					id='sidebar.recent'
					defaultMessage="Recent"
					description="Recent watched in sidebar"
			/></h1>
			<div className="sidebar">
				<SidebarItem recentMov={this.state.recentMov} />
			</div>
		</div>	
		)
	}
	
}

export default Sidebar;
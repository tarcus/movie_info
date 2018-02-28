import React, {Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'


class NextTVAirDate extends Component {
	constructor(props){
		super(props);

		this.state = {nextAir: ''}
	}

	getTVStuff = (tvID)=>{
		//получаем текущую дату в iso формате и отрезаем лишнее
		const currentDate = new Date().toISOString().slice(0, 10);
		//нужно получить последний сезон(текущий) tvID это id сериала
			const optionsTVInfo = {
				method: 'get',
				timeout: 4000,
				url: `${baseUrl}/tv/${tvID}`, 
				params: {
					language: 'en',
					api_key: api_key,
				}
			}

		//получаем номер сезона
		axios(optionsTVInfo)
		.then((response)=>{
			//проверяем длинну массива серий, это количество сезонов
			//console.log('TV: ',response.data.seasons.length-1); //это подставляем в seasonNum
			const lastSeason = response.data.seasons.length-1;
			//получаем инфу о сезоне
			return axios({
				method: 'get',
				timeout: 4000,
				url: `${baseUrl}/tv/${tvID}/season/${lastSeason}`,
				params: {
					language: 'en',
					api_key: api_key,
				}
			});
		})
		.then((response)=>{
			const nextEpisodes = response.data.episodes.filter((item)=>{
					return item.air_date >= currentDate
			});

			const nextAir = nextEpisodes.map((item)=>{
				return {id: item.id, next_air_date: item.air_date }
			});

			//console.log("NEXT AIR" ,nextEpisodes[0].air_date) 	
				this.setState({nextAir: nextEpisodes[0].air_date})
			 		
		})
		.catch((error)=>{
			console.log(error)
		})

	}

	
	componentDidMount(){
		this.getTVStuff(this.props.tvID)
	}

	// componentWillReceiveProps(nextProps){
	// 	this.getTVStuff(nextProps)
	// }

	render(){
		return(
			<div className="next-air-date">
				{this.state.nextAir}
			</div>
		)
	}
}

export default NextTVAirDate;
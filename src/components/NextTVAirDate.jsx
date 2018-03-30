import React, {Component} from 'react'
import axios from 'axios'
import {api_key, baseUrl} from '../options/apiOptions'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	next_tv_air_date_season_ended: {
		id: 'next_tv_air_date.season_ended',
		defaultMessage: 'Season Ended'
	},
	next_tv_air_date_next_air: {
		id: 'next_tv_air_date.next_air',
		defaultMessage: 'Next Air'
	},
}) 

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

			if(nextEpisodes.length == 0){
				this.setState({nextAir: 'Season Ended'})
			} else {
				this.setState({nextAir: nextEpisodes[0].air_date})
			}
									 		
		})
		.catch((error)=>{
			console.log(error)
		})

	}

	
	componentDidMount(){
		this.getTVStuff(this.props.tvID)
	}


	render(){
		return(
			<div className="next-air-date font-md">
				{this.state.nextAir=='Season Ended' ? this.props.intl.formatMessage(messages.next_tv_air_date_season_ended) : `${this.props.intl.formatMessage(messages.next_tv_air_date_next_air)}: ${this.state.nextAir}`}
			</div>
		)
	}
}

export default injectIntl(NextTVAirDate);
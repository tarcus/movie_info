import React, {Component} from 'react'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl, defineMessages} from 'react-intl'
import axios from 'axios'
import {Link} from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import NextTVAirDate from './NextTVAirDate'
import Spinner from './Spinner'
import {genKey} from '../utils/helpers'
//import Img from 'react-image'

const messages = defineMessages({
	now_playing_mov_h2_movie: {
		id: 'now_playing_mov.h2_movie',
		defaultMessage: 'New Movies In Theaters'
	},
	now_playing_mov_h2_tv: {
		id: 'now_playing_mov.h2_tv',
		defaultMessage: 'TV On The Air'
	},
	now_playing_mov_released: {
		id: 'now_playing_mov.released',
		defaultMessage: 'Released'
	},
}) 

class NowPlayingMov extends Component {
	constructor(props){
		super(props);
		this.state = {data: [], isLoading: true }
	}
	
	getNowPlaying = ()=>{
			const options = {
				timeout: 4000,
				url: `${baseUrl}/${this.props.movie ? 'movie/now_playing' : 'tv/on_the_air'}`, 
				params: {
					language: this.props.intl.locale,
					api_key,
					//region: 'RU',
					page:  this.props.movie ? Math.floor((Math.random() * 3) + 1) : 1 //генерит от 1-3
				}
			}


		axios(options)
		.then((response)=>{
			this.setState({data: response.data.results, isLoading: false})})
		.catch((error)=>{
			this.setState({isLoading: false})
			console.log(error)
		})
	
	}

 
	componentDidMount(){
		this.getNowPlaying();
	}

	render(){
		const movie = this.props.movie;

		const getRand = () =>{
			 const begin = Math.floor(Math.random() * 20);
			 const end = begin + 2;
			 return [begin, end]	
		}

		const commonRand = getRand();
		
		//Чтобы не было повторов 
		const sliceParamsForSmallImg = () =>{
			if(commonRand[0]<=14){
				const smBegin = commonRand[0] + 1;
				return [smBegin, smBegin + 5]
			} else {
				return [commonRand[0] - 5, (commonRand[0] - 5) + 5]
			}	
		}

		
		const bigImg = this.state.data.slice(...commonRand).map((item)=>{
				if(item.backdrop_path !==null){ 
					return <div className="big-img" key={genKey()}>
								<img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} />
								<div className="inside-wrap">
									<div className="poster-inside">
										<Link to={movie ? `/movies/${item.id}` : `/series/${item.id}`}>
											<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
										</Link>
									</div>
									<div className="title-rel-wrap">
										<span className="font-bg text-shad">
											{movie ? item.title : item.name}
										</span>
										<div>
										<span className="next-episode-big font-md translucent-bg">
											{movie ? `${this.props.intl.formatMessage(messages.now_playing_mov_released)}: ${item.release_date}` : <NextTVAirDate tvID={item.id}/>}
										</span>
										</div>
									</div>
									
								</div>		
						  </div>
				}		  
		})

		const smallImages = this.state.data.slice(...sliceParamsForSmallImg()).map((item)=>{
			  if(item.backdrop_path !==null){ 
			  	return <div className="small-img" key={genKey()}>
				  			<Link to={movie ? `/movies/${item.id}` : `/series/${item.id}`}>
								<img src={`https://image.tmdb.org/t/p/w185/${item.backdrop_path}`} />
							</Link>
							<span className="small-img-title">
								<div className="text-shad">
									<TextTruncate
								    line={1}
								    truncateText="…"
								    text={movie ? item.title : item.name}
									/>
								</div>	
									
								<span className="translucent-bg">
									{movie ? item.release_date : <NextTVAirDate tvID={item.id}/>}
								</span>
								
							</span>
					  </div>
			  }
		})


		if(this.state.isLoading){
			return(
				<div className="now-playing-mov">
					<h2>{movie ? this.props.intl.formatMessage(messages.now_playing_mov_h2_movie) : this.props.intl.formatMessage(messages.now_playing_mov_h2_tv)}</h2>
					<div className="now-playing-card row-no-justify">
						<Spinner />
					</div>
				</div>
			)
		}

		return(
			<div className="now-playing-mov">
				<h2>{movie ? this.props.intl.formatMessage(messages.now_playing_mov_h2_movie) : this.props.intl.formatMessage(messages.now_playing_mov_h2_tv)}</h2>			
				<div className="now-playing-card row-no-justify">
					{bigImg.filter((item)=>{
							return item !==undefined
						}).slice(0, 1)}
					<div className="sm-images-wrap">					
						{smallImages.filter((item)=>{
							return item !==undefined
						}).slice(0, 3)}
					</div>	
				</div>				
			</div>
		)
	}

}

export default injectIntl(NowPlayingMov);
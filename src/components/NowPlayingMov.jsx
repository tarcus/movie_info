import React, {Component} from 'react'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import {Link} from 'react-router-dom'
import TextTruncate from 'react-text-truncate'
import NextTVAirDate from './NextTVAirDate'

//FOR TV SHOW....
//TV has name  instead  title
//page 1 instead  rand
//tv/on_the_air instead  movie/now_playing


class NowPlayingMov extends Component {
	constructor(props){
		super(props);

		this.state = {data: [] }
	}
	

	getNowPlaying = ()=>{
			const options = {
				method: 'get',
				timeout: 4000,
				url: `${baseUrl}/${this.props.movie ? 'movie/now_playing' : 'tv/on_the_air'}`, 
				params: {
					language: this.props.intl.locale,
					api_key: api_key,
					//region: 'US',
					page:  this.props.movie ? Math.floor((Math.random() * 3) + 1) : 1 //генерит от 1-3
				}
			}


		axios(options)
		.then((response)=>{
			console.log('MAIN: ',response.data);
			//добавим
			//const nextAir = response.data.results.map((item)=>{
			//	return {id: item.id, next_air_date: getTVStuff(item.id) }
			//})

			this.setState({data: response.data.results})})
		.catch((error)=>{
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
		console.log('COMMONRAND: ',commonRand)


		//Чтобы не было повторов 
		const sliceParamsForSmallImg = () =>{
			if(commonRand[0]<=14){
				const smBegin = commonRand[0] + 1;
				return [smBegin, smBegin + 5]
			} else {
				return [commonRand[0] - 5, (commonRand[0] - 5) + 5]
			}	
		}

		
		console.log('SLICE: ',sliceParamsForSmallImg())


		const bigImg = this.state.data.slice(...commonRand).map((item)=>{
				if(item.backdrop_path !==null){ 
					return <div className="big-img" key={item.id}>
								<img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}/>
								<div className="inside-wrap">
									<div className="poster-inside">
										<Link to={movie ? `/movies/${item.id}` : `/series/${item.id}`}>
											<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
										</Link>
									</div>
									<div className="title-rel-wrap">
										<span className="translucent-bg font-bg">
											{movie ? item.title : item.name}
										</span>
										<div>
										<span className="next-episode-big font-md translucent-bg">
											{movie ? `Released: ${item.release_date}` : <NextTVAirDate tvID={item.id}/>}
										</span>
										</div>
									</div>
									

								</div>		
						  </div>
				}		  
		})

		const smallImages = this.state.data.slice(...sliceParamsForSmallImg()).map((item)=>{
			  if(item.backdrop_path !==null){ 
			  	return <div className="small-img" key={item.id}>
				  			<Link to={movie ? `/movies/${item.id}` : `/series/${item.id}`}>
								<img src={`https://image.tmdb.org/t/p/w185/${item.backdrop_path}`}/>
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


		return(
			<div className="now-playing-mov">
				<h2>{movie ? 'New Movies In Theaters' : 'TV On The Air'}</h2>

				
				<div className="now-playing-card row-no-justify">
					{bigImg.filter((item)=>{
							return item !==undefined
						}).slice(0, 1)}

					<div className="sm-images-wrap">
						{console.log(smallImages)}
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
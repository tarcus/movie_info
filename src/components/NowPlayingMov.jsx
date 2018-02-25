import React, {Component} from 'react'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import axios from 'axios'
import {Link} from 'react-router-dom'
import TextTruncate from 'react-text-truncate'

//FOR TV SHOW....
//TV has name  instead  title
//page 1 instead  rand
//tv/on_the_air instead  movie/now_playing


class NowPlayingMov extends Component {
	constructor(props){
		super(props);

		this.state = {data: []}
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
			console.log(response.data);
			this.setState({data: response.data.results})})
		.catch((error)=>{
			console.log(error)
		})
	
	}

	getTVStuff = ()=>{
		const tvID = null; //Это тоже нахуй потом убери
		const seasonNum = 8; //это должен быть результат предыдущего запроса
		//получаем текущую дату в iso формате и отрезаем лишнее
		const currentDate = new Date().toISOString().slice(0, 10);
		console.log(currentDate, Date.now())



		var date = new Date(2010,10,30)
		console.log('DATE: ', date)
		console.log('DATE PARSE: ', Date.parse('2018-02-25'))
		//количество сезонов и т.д

		//нужно получить последний сезон(текущий)
			const optionsTVInfo = {
				method: 'get',
				timeout: 4000,
				url: `${baseUrl}/tv/${tvID ? tvID : '1402'}`, //заглушка, допили позже
				params: {
					language: this.props.intl.locale,
					api_key: api_key,
					//region: 'US',
					//page:  this.props.movie ? Math.floor((Math.random() * 3) + 1) : 1 //генерит от 1-3
				}
			}

			const optionsForSeasonNum = {
				method: 'get',
				timeout: 4000,
				url: `${baseUrl}/tv/${tvID ? tvID : '1402'}/season/${seasonNum}`, //заглушка, допили позже
				params: {
					language: this.props.intl.locale,
					api_key: api_key,
				}
			}
		
		//получаем номер сезона
		axios(optionsTVInfo)
		.then((response)=>{
			console.log('TV: ',response.data);
			//this.setState({data: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})

		//получаем инфу о сезоне
		axios(optionsForSeasonNum)
		.then((response)=>{
			console.log('TV SEASON: ',response.data);
			//нужно перебрать response.data.episodes[air_date] сравнить с текущей датой и выбрать ближайший следующий
			//this.setState({data: response.data.results})
			const difference = response.data.episodes.filter((item)=>{
				return item.air_date >= currentDate
			})

			console.log('DIF: ',difference)

		})
		.catch((error)=>{
			console.log(error)
		})


	}


	componentDidMount(){
		this.getNowPlaying();
		this.getTVStuff();
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
									<span>{movie ? item.title : item.name}</span>
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
								<TextTruncate
								    line={1}
								    truncateText="…"
								    text={movie ? item.title : item.name}
								/>
								{item.first_air_date}
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
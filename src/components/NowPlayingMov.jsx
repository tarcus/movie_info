import React, {Component} from 'react'
import {api_key, baseUrl} from '../options/apiOptions'
import {injectIntl} from 'react-intl'
import axios from 'axios'

class NowPlayingMov extends Component {
	constructor(){
		super()

		this.state = {data: []}
	}

	getNowPlaying = ()=>{
		const options = {
			method: 'get',
			timeout: 4000,
			url: `${baseUrl}/movie/now_playing`,
			params: {
				language: this.props.intl.locale,
				api_key: api_key,
				page: 1//Math.floor((Math.random() * 10) + 1)
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


	componentDidMount(){
		this.getNowPlaying();
	}

	render(){
		const getRand = () =>{
			 const begin = Math.floor(Math.random() * 20);
			 const end = begin + 1;
			 return [begin, end]	
		}

		const commonRand = getRand();
		console.log('COMMONRAND: ',commonRand)


		//HOLY SHIT, FORGIVE ME OH LORD FOR THIS SHITTY CODE
		const sliceParamsForSmallImg = () =>{
			if(commonRand[0]<=16){
				const smBegin = commonRand[0] + 1;
				return [smBegin, smBegin + 3]
			} else {
				return [commonRand[0] - 3, (commonRand[0] - 3) + 3]
			}	
		}

		
		

		console.log('SLICE: ',sliceParamsForSmallImg())


		const bigImg = this.state.data.slice(...commonRand).map((item)=>{
					return <div className="big-img" key={item.id}>
								<img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}/>
								<div className="inside-wrap">
									<div className="poster-inside">
										<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
									</div>
									<span>{item.title}</span>
								</div>		
						  </div>
		})

		const smallImages = this.state.data.slice(...sliceParamsForSmallImg()).map((item)=>{
			return <div className="small-img" key={item.id}>
						<img src={`https://image.tmdb.org/t/p/w154/${item.backdrop_path}`}/>
					</div>
		})


		


		return(
			<div className="now-playing-mov">
				<h2>Now Playing Movie</h2>

				
				<div className="now-playing-card row-no-justify">
					{bigImg}
					{smallImages}
				</div>
				
				
			</div>
		)
	}

}

export default injectIntl(NowPlayingMov);
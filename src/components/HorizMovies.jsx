import React,{Component} from 'react';
import axios from 'axios';
import HorizMovItem from './HorizMovItem'
import Slider from 'react-slick'
import {injectIntl} from 'react-intl'

class HorizMovies extends Component {
	constructor(props){
		super(props);

		this.state = {movies: []}
	}

	//Тянем  самые популярные фильмы с API
	componentDidMount(){
		const options = {
			method: 'get',
			timeout: 3000,
			url: 'https://api.themoviedb.org/3/discover/movie',
			params: {
				language: this.props.intl.locale,
				api_key: 'c1fad56e0574e61854cae2298d7093c4',
				sort_by: 'popularity.desc',
				include_adult: false,
				include_video: false,
				page: 1

			}
		}
		axios(options)
		.then((response)=>{
			console.log(response.data)
			this.setState({movies: response.data.results})
		})
		.catch((error)=>{
			console.log(error)
		})
	}

	render(){
		const movies = this.state.movies;
	//конфиг для карусели
		var settings = {
		      dots: true,
		      arrows: false,
		      infinite:false,
		      speed: 500,
		      slidesToShow: 10,
		      slidesToScroll: 10,
		      className: 'inner-slider-movie',
		      touchMove: true,
		      swipeToSlide: false,
		      responsive: [ 
			      { breakpoint: 481, settings: { slidesToShow: 4, slidesToScroll: 4 } },
			      { breakpoint: 800, settings: { slidesToShow: 7, slidesToScroll: 7 } },
			      { breakpoint: 1025, settings: { slidesToShow: 8, slidesToScroll: 8} },
			      
		      ]
		    };
		return(
			
				<Slider {...settings}>
				{movies.map((item)=>{
					return  <div key={item.id} className="horiz-mov-item-carousel">
								<div className="horiz-mov-item-carousel-inner">
									<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
								</div>
								
							</div>
					})}
        		{/*
					<div className="horiz-mov-container">
				{movies.map((item)=>{
					return <HorizMovItem key={item.id} movie={item} />
					})}
				</div>*/}
      			</Slider>

					
			
				
		)
	}
}

export default injectIntl(HorizMovies);


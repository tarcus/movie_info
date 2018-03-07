import React,{Component} from 'react';
import axios from 'axios';
import HorizMovItem from './HorizMovItem'
import Slider from 'react-slick'
import {injectIntl} from 'react-intl'
import {api_key, baseUrl} from '../options/apiOptions'
import {Link} from 'react-router-dom'

class HorizMovies extends Component {
	constructor(props){
		super(props);

		this.state = {movies: []}
	}

	//Тянем  самые популярные фильмы с API рандомную страницу из сотни
	componentDidMount(){
		const options = {
			timeout: 4000,
			url: `${baseUrl}/discover/movie`,
			params: {
				language: this.props.intl.locale,
				api_key,
				sort_by: 'popularity.desc',
				include_adult: false,
				include_video: false,
				page: Math.floor((Math.random() * 100) + 1)

			}
		}
		axios(options)
		.then((response)=>{
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
		      	  { breakpoint: 321, settings: { slidesToShow: 3, slidesToScroll: 3 } },
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
									<Link to={`/movies/${item.id}`}>
									<img src={`https://image.tmdb.org/t/p/w92/${item.poster_path}`}/>
									</Link>
								</div>
								
							</div>
					})}
        		
      			</Slider>

		
		)
	}
}

export default injectIntl(HorizMovies);


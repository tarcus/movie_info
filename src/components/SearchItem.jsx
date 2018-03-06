import React from 'react'
import {Link} from 'react-router-dom'
import Img from 'react-image'
import dummyImg_92 from '../images/dummy_92.png'
import Spinner from './Spinner'
import Truncate from 'react-truncate'


const SearchItem = ({data})=>{

	const urlPart = {
		movie: 'movies',
		tv: 'series',
		person: 'actors'
	}

	//Movies for the person
	if(data.media_type=='person'){
		//если в массиве один из элементов null то все идет по пизде, отфильтруем сперва
		const filtered = data.known_for.filter((item)=>{
			return  item 
		})
		var knownAs = filtered.map((item, i, arr)=>{
		return <p key={item.id}>{`${item.title} ${arr.length>(i+1) ? ", " : "." }`} </p>
		})
		
	}
	

	const popularity = data.popularity ? data.popularity.toString().slice(0, 3) : '';
	
	return(
		<div className="search-item-wrap row-nowrap">
			<div className="search-item-img-wrap">
				<Link to={`/${urlPart[data.media_type]}/${data.id}`}>
					<Img src={[`https://image.tmdb.org/t/p/w92/${data.poster_path ? data.poster_path : data.profile_path}`,dummyImg_92]}
						 loader={<Spinner />}
					/>
				</Link>
			</div>
			<div className="search-item-info">
				<h4>{data.title ? data.title : data.name } {data.release_date ? `(${data.release_date})` : data.first_air_date ? `(${data.first_air_date})` : ''}</h4>
				<div className="search-item-rating">
					<b>{data.vote_average ? 'Rating:' : 'Popularity'}</b> {data.vote_average ? data.vote_average : popularity}	
				</div>
				
				
				<div className="search-item-overview">
					<Truncate lines={2} ellipsis={<span>..</span>}>
						{(data.media_type=='person') ? knownAs : data.overview} 
					</Truncate>
						
				</div>
				<span className="search-media-type"><b>{data.media_type}</b></span>
				<div className="search-item-more">
					<Link to={`/${urlPart[data.media_type]}/${data.id}`}>Read More</Link>
				</div>
			</div>
		</div>
	)
}

export default SearchItem;


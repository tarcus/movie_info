import React from 'react'
import SearchItem from './SearchItem'

const SearchView = ({data})=>{
	return(
		<div className="col-1">
			<h1 className="search">Total Results {data.total_results}</h1>
			{data.results.map((item)=>{
				return <SearchItem data={item} key={item.id}/>
			})}
		</div>
	)
}

export default SearchView;
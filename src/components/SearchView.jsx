import React from 'react'
import SearchItem from './SearchItem'
import {defineMessages, injectIntl} from 'react-intl'

//i18n
const messages = defineMessages({
	searchview_h1: {
		id: 'searchview.h1',
		defaultMessage: 'Total Results'
	}
}) 

const SearchView = ({intl, data})=>{
	return(
		<div className="search-view-col-1">
			<h1 className="search">{intl.formatMessage(messages.searchview_h1)}: {data.total_results}</h1>
			{data.results.map((item)=>{
				return <SearchItem data={item} key={item.id}/>
			})}
		</div>
	)
}

export default injectIntl(SearchView);
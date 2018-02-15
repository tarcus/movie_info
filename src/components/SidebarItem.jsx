import React from 'react'

const SidebarItem = ({recentMov})=>{
	return(
		<div className="row-sidebar-inner">
			{recentMov.map((item, index)=> <div className="sidebar-item" key={Math.random().toString(34).slice(4)}><img src={item.Poster}/></div> )}
		</div>
	)
}

export default SidebarItem;
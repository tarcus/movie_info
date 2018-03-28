import React,{Component} from 'react'
import classNames from 'classnames'
import ruIcon from '../images/RU_icon.png'
import enIcon from '../images/GB_icon.png'

class LangSelector extends Component {
	constructor(props){
		super(props);

		//получаем значение локали из LocalStorage если есть
		//localStorage.setItem('lang', 'ru')
		const lang = localStorage.getItem('lang')

		this.state = {lang: (lang) ? lang : 'en', isOpen: false}
	}

	dropToggle = ()=>{
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	switchRu = ()=>{
		this.setState({
			lang: 'ru'
		})

		localStorage.setItem('lang', 'ru')
		location.reload()
	}

	switchEn = ()=>{
		this.setState({
			lang: 'en'
		})

		localStorage.setItem('lang', 'en')
		location.reload()
	}

	render(){

		const dropClasses = classNames({
			'drop-toggle': true,
			'open' : this.state.isOpen
		})

		return(
			<div className="lang-selector" onClick={this.dropToggle}>
				<span className="lang-selector-trigger">
				<img src={this.state.lang==="ru" ? ruIcon : enIcon}/>
				</span>
				
				<div className={dropClasses}>
					<span className="lang-item en" onClick={this.switchEn}><img src={enIcon}/></span>
					<span className="lang-item ru" onClick={this.switchRu}><img src={ruIcon}/></span>
				</div>
				
			</div>
		)
	}
}

export default LangSelector;
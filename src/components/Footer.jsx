import React from 'react';
import {defineMessages, injectIntl} from 'react-intl'
//import FontAwesome from 'react-fontawesome'

const year = new Date().getFullYear();

const messages = defineMessages({
	footer_copyright: {
		id: 'footer.copyright',
		defaultMessage: 'Max Media. All rights reserved.'
	}
}) 

const Footer = (props)=>{
	return(
		<div className="footer row">
			<div>
				Copyright &copy; {year} {props.intl.formatMessage(messages.footer_copyright)}	
			</div>
			{/*<div className="footer-mail"> <a href="mailto:someone@example.com"><FontAwesome name='envelope'  /> watch_this@gmail.com</a></div>*/}
		</div>
	)
}

export default injectIntl(Footer);
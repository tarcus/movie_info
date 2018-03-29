import React from 'react';
import {defineMessages, injectIntl} from 'react-intl'

const year = new Date().getFullYear();

const messages = defineMessages({
	footer_copyright: {
		id: 'footer.copyright',
		defaultMessage: 'Max Media. All rights reserved.'
	}
}) 

const Footer = (props)=>{
	return(
		<div className="footer">
			<p>
				Copyright &copy; {year} {props.intl.formatMessage(messages.footer_copyright)}	
			</p>
		</div>
	)
}

export default injectIntl(Footer);
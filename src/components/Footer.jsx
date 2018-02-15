import React from 'react';
import {FormattedMessage} from 'react-intl'

const Footer = (props)=>{
	return(
		<div className="footer">
			<p>Copyright &copy; <FormattedMessage 
						id='footer.copyright'
						defaultMessage="2018 Max Media. All rights reserved."
						description="copyright"
					  /> 

			</p>
		</div>
	)
}

export default Footer;
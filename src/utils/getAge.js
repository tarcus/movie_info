function getAge(birthDate){
	
	const birthDate2 = birthDate ? birthDate : ''
	const birthDateArr = birthDate2.split('-');
	const date = new Date(birthDateArr)
	const dif = Date.now() - date.getTime();
	const age_dt = new Date(dif);

	return Math.abs(age_dt.getUTCFullYear() - 1970) || 'Who knows...'
	

	
	
}

export default getAge;

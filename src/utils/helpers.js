function sliceDate(date=''){
	return date.slice(0,4)
}

function genKey(){
	return Math.random().toString(34).slice(-6)
}

export {sliceDate, genKey};
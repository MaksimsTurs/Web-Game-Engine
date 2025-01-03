export default function isObjectEmpty(object) {
	let count = 0
	
	for(let _ in object) {
		count++
		if(count > 0) return false
	}

	return true
}
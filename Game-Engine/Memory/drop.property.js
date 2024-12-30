import StringConstructor from "../Engine-Types/String-Constructor/StringConstructor.type.js"

export default function drop(...references) {
	let index = 0
	let length = references.length

	while(index < length) {
		if(references[index] instanceof StringConstructor) {
			references[index].set(null)
		} else {
			references[index] = null
		}		

		index++
	}

	references = null
}
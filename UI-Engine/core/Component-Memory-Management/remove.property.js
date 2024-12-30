import ComponentConstructor from "../ComponentConstructor.core.js"

export default function remove(...componentReferences) {
	let index = 0
	let length = componentReferences.length

	while(index < length) {
		if(componentReferences[index] instanceof ComponentConstructor) {
			componentReferences[index].delete()
		} else if(componentReferences[index] instanceof HTMLElement) {
			componentReferences[index].remove()
		}		

		index++
	}

	componentReferences = null
}
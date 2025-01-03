import UIElement from "../UIElement.core.js"

//Delete HTML elements and Components that was created with UIElement class
export default function remove(...componentReferences) {
	let index = 0
	let length = componentReferences.length

	while(index < length) {
		if(componentReferences[index] instanceof UIElement) {
			componentReferences[index].delete()
		} else if(componentReferences[index] instanceof HTMLElement) {
			componentReferences[index].remove()
		}		

		index++
	}

	componentReferences = null
}
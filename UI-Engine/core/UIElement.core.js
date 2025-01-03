class UIElement {
	#element = null
	#eventReferences = null

	constructor(tag) {
		this.#element = document.createElement(tag)
		this.#eventReferences = []
	}

	set(propName, ...propArg) {
		if(typeof this.#element[propName] === "function") {
			this.#element[propName](...propArg)
		}

		if(
			typeof this.#element[propName] === "object" || 
			typeof this.#element[propName] === "string" ||
			typeof this.#element[propName] === "number" ||
			typeof this.#element[propName] === "undefined"
		) {
			this.#element[propName] = propArg
		}

		return this
	}

	get(propName) {
		return this.#element[propName]
	}

	getDOMElement() {
		return this.#element
	}

	addEvent(eventName, callback) {
		this.#element.addEventListener(eventName, callback)
		this.#eventReferences.push({ eventName, callback })
	}

	removeEvent(eventName, callback) {
		let newReferencesArray = []
		let index = 0
		let length = this.#eventReferences.length

		//Remove event listener meta information from event listener references array
		while(index < length) {
			if(eventName !== this.#eventReferences[index].eventName && !Object.is(callback, this.#eventReferences[index].callback)) {
				newReferencesArray.push(this.#eventReferences[index])
			}
			index++
		}
		
		//Remove event listener from element and update event listener references array
		this.#element.removeEventLisneter(eventName, callback)
		this.#eventReferences = newReferencesArray
	}

	delete() {
		let index = 0
		let length = this.#eventReferences.length

		//Remove all meta inforamtion about event listener from references array and removing event listener from element
		while(index < length) {
			this.#element.removeEventListener(this.#eventReferences[index].eventName, this.#eventReferences[index].callback)
			this.#eventReferences.shift()
			index++
		}

		//Remove all references and element
		this.#element.remove()
		this.#element = null
		this.#eventReferences = null
	}
}

export default UIElement
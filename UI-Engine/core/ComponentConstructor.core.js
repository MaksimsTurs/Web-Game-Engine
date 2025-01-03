class ComponentConstructor {
	#node = undefined
	#eventReferences = []

	constructor(node) {
		if(typeof node === "string") {
			this.#node = document.createElement(node)
		} else {
			this.#node = node
		}
	}

	get node() {
		return this.#node
	}

	setStyle(styleName, styleValue) {
		this.#node.style[styleName] = styleValue
	}

	getStyleAsNumber(styleName) {
		return +(this.#node.style[styleName])
	}

	getStyleAsString(styleName) {
		return this.#node.style[styleName]
	}

	addEvent(name, callback) {
		this.#node.addEventListener(name, callback)
		this.#eventReferences.push({ name, callback })
	}

	removeEvent(name, funcReference) {
		this.#node.removeEventListener(name, funcReference)
	}

	delete() {
		let index = 0
		let length = this.#eventReferences.length
		
		while(index < length) {
			this.removeEvent(this.#eventReferences[index].name, this.#eventReferences[index].callback)
			this.#eventReferences.shift()
			index++
		}

		this.#node.remove()
		this.#node = null
	}
}

export default ComponentConstructor
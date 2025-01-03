class UIState {
	#state = null
	#deps = null

	constructor(initValue) {
		this.#state = initValue
		this.#deps = []
	}

	bind(callback, initRender) {
		this.#deps.push(callback)

		if(initRender) {
			callback(this.#state)
		}
	}

	update(maybeCallback) {
		if(typeof maybeCallback === "function") {
			const newValue = maybeCallback(this.#state)
			this.#state = newValue
		} else {
			this.#state = maybeCallback
		}

		let index = 0
		let length = this.#deps.length

		while(index < length) {
			this.#deps[index](this.#state)
			index++
		}
	}
}

export default UIState
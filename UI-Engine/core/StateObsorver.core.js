class StateObsorver {
	#data = undefined
	#deps = []
	
	constructor(initValue) {
		this.#data = initValue
	}

	bind(renderFunc, callOnInit) {
		this.#deps.push(renderFunc)

		if(callOnInit) {
			renderFunc(this.#data)
		}
	}

	set(callback) {
		let index = 0
		let depsLen = this.#deps.length

		//Update current data
		if(typeof callback === "function") {
			const newState = callback(this.#data)
			this.#data = newState
		} else {
			this.#data = callback
		}

		//Recall all deps functions
		while(index < depsLen) {
			this.#deps[index](this.#data)
			index++
		}
	}

	get() {
		return this.#data
	}
}

export default StateObsorver
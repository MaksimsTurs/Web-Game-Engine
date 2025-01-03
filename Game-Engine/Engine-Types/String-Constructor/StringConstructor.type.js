import isArray from "../../util/isArray.util.js"
import isNull from "../../util/isNull.util.js"

class StringConstructor {
  #str = null

  constructor(defaultValue, isModifable = true) {
    this.#str = defaultValue
		
		if(typeof isModifable === "boolean" && !isModifable) {
			Object.freeze(this)
		}
  }

  get() {
    return this.#str
  }

  set(value, inIndex) {
    if(isArray(this.#str) && inIndex && typeof value === "string") {
      this.#str[inIndex] = value
    } else {
      this.#str = value
    }
  }

  toUpperCase() {
    if(isNull(this.#str) || isArray(this.#str)) {
      return this
    }

    this.#str = this.#str.toUpperCase()
    return this
  }

  toLowerCase() {
    if(isNull(this.#str) || isArray(this.#str)) {
      return this
    }

    this.#str = this.#str.toLowerCase()
    return this
  }

  trim() {
    if(isNull(this.#str) || isArray(this.#str)) {
      return this
    }

    this.str = this.#str.trim()
    return this 
  }

  repeat(count) {
    if(isNull(this.#str) || isArray(this.#str)) {
      console.warn("You trying to use repeat function on non string value")
      return this
    }

    this.#str = this.#str.repeat(count)
    return this
  }

  replace(searchValue, replaceValue) {
    if(isNull(this.#str) || isArray(this.#str)) {
      console.warn("You trying to use replace function on non string value")
      return this
    }

    this.#str = this.#str.replace(searchValue, replaceValue)
    return this 
  }

  search(searchValue) {
    if(isNull(this.#str) || isArray(this.#str)) {
      console.warn("You trying to use search function on non string value")
      return 0
    }

    return this.#str.search(searchValue)
  }

  slice(start, end) {
    if(isNull(this.#str) || isArray(this.#str)) {
      console.warn("You trying to use slice function on non string value")
      return this
    }

    this.#str = this.#str.slice(start, end) 
    return this
  }

  split(splitter, limit) {
    if(isNull(this.#str) || isArray(this.#str)) {
      console.warn("You trying to use split function on non string value")
      return this
    }

    this.#str = this.str.split(splitter, limit) 
    return this
  }

  join(separator) {
    if(isNull(this.#str) || !isArray(this.#str)) {
      console.warn("You trying to use join function on non array value")
      return this
    }

    this.#str = this.#str.join(separator) 
    return this
  }

  includes(searchElement, fromIndex) {
    if(isNull(this.#str) || !isArray(this.#str)) {
      console.warn("You trying to use join function on non array value")
      return false
    }

    return (this.#str).includes(searchElement, fromIndex) 
  }

  iterator(callback) {
    const isWasArray = isArray(this.#str)
    const charArray = isWasArray ? this.#str : (this.#str).split("")

    let index = 0
    const length = charArray.length

    while(index < length) {
      const mutated = callback(charArray[index])
      
      if(typeof mutated !== "string") {
        throw new TypeError(`${mutated} is not of type "string"!`)
      }

      charArray[index] = mutated
      index++
    }

    this.#str = isWasArray ? charArray : charArray.join()

    return this
  }
}

export default StringConstructor
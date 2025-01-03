export default function isElementExist(DOMNode) {
	if(!DOMNode) {
		return false
	}

	const nodeId = DOMNode.getAttribute("id")
	const nodeClass = DOMNode.getAttribute("class")

	let maybeClone = undefined

	if(nodeId) {
		maybeClone = document.getElementById(nodeId)
	} else {
		maybeClone = document.querySelector(`.${nodeClass}`)
	}
	
	if(maybeClone === DOMNode) {
		return true
	}

	return false
}
export default function isElementExist(DOMNode) {
	if(!DOMNode) {
		return false
	}

	switch(typeof DOMNode) {
		case "string":
			return document.querySelector(DOMNode)
		case "object":
			const nodeId = DOMNode.getAttribute("id")
			const nodeClass = DOMNode.getAttribute("class")
		
			let maybeClone = undefined
		
			if(nodeId?.length > 0) {
				maybeClone = document.getElementById(nodeId)
			} else {
				maybeClone = document.getElementsByClassName(nodeClass)
			}
			
			if(maybeClone === DOMNode) {
				return true
			}
	}

	return false
}
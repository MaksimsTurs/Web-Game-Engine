import * as GameNodesModalList from "./GameNodesModalList.ui.js"
import * as GameNodesModal from "./GameNodesModal.ui.js"

import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

let AddNode = null
let RemoveNode = null
let AsideContextMenu = null

function openGameNodesModal(event) {
	event.stopPropagation()
	//Close aside menu context menu
	DeinitAsideContextMenu()
	//Init game nodes modal
	GameNodesModal.InitGameNodesModal()
	//Init game nodes modal list
	GameNodesModalList.InitGameNodesModalList()
	//Show Game nodes modal
	GameNodesModal.getNode("GameNodesModalContainer").classList.remove("game-nodes-modal-hidden")
}

export function DeinitAsideContextMenu() {
	//Remove event listener
	AddNode?.removeEventListener("click", openGameNodesModal)
	//Remove elements from the DOM
	DOMElementManager.remove(AddNode, RemoveNode, AsideContextMenu)
	//Remove references
	AddNode = null
	RemoveNode = null
	AsideContextMenu = null
}

export function InitAsideContextMenu() {
	const CLASS_NAME = "aside-menu-contextmenu-button"
	const NODE_TYPE = "button"
	//Create elements
	AddNode = document.createElement(NODE_TYPE)
	RemoveNode = document.createElement(NODE_TYPE)
	AsideContextMenu = document.createElement("section")
	//Add class selector
	AddNode.classList.add(CLASS_NAME)
	RemoveNode.classList.add(CLASS_NAME)
	//Add text content
	AddNode.textContent = "Add new node"
	RemoveNode.textContent = "Remove node"	
	//Add event listener
	AddNode.addEventListener("click", openGameNodesModal)
	//Set attribute and append buttons in to the root element
	AsideContextMenu.setAttribute("id", "aside-menu-contextmenu")
	AsideContextMenu.appendChild(AddNode)
	AsideContextMenu.appendChild(RemoveNode)
}

export function getNode(nodeName) {
	switch(nodeName) {
		case "AsideContextMenu":
			return AsideContextMenu
		case "AddNode":
			return AddNode
		case "RemoveNode":
			return RemoveNode
	}
}

export function setStyle(nodeName, styleKey, styleValue) {
	switch(nodeName) {
		case "AsideContextMenu":
			AsideContextMenu.style[styleKey] = styleValue
			break
		case "AddNode":
			AddNode.style[styleKey] = styleValue
			break
		case "RemoveNode":
			RemoveNode.style[styleKey] = styleValue
			break
	}
}
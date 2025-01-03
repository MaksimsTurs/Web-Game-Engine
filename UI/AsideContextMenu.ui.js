import * as GameNodesModalList from "./GameNodesModalList.ui.js"
import * as GameNodesModal from "./GameNodesModal.ui.js"

import UIElement from "../UI-Engine/core/UIElement.core.js"
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
	GameNodesModal.getModuleGlobalVar("GameNodesModalContainer").getDOMElement().classList.remove("game-nodes-modal-hidden")
}

export function DeinitAsideContextMenu() {
	//Remove nodes
	DOMElementManager.remove(AddNode, RemoveNode, AsideContextMenu)
	//Remove references
	AddNode = null
	RemoveNode = null
	AsideContextMenu = null
}

export function InitAsideContextMenu() {
	const CLASS_NAME = "aside-menu-contextmenu-button"
	const NODE_TYPE = "button"

	//Create add node button
	AddNode = new UIElement(NODE_TYPE)
	AddNode
		.set("setAttribute", "class", CLASS_NAME)
		.set("textContent", "Add new node")
		.addEvent("click", openGameNodesModal)

	//Create remove node button
	RemoveNode = new UIElement(NODE_TYPE)
	RemoveNode
		.set("setAttribute", "class", CLASS_NAME)
		.set("textContent", "Remove node")

	//Create root element
	AsideContextMenu = new UIElement("section")
	AsideContextMenu
		.set("setAttribute", "id", "aside-menu-contextmenu")
		.set("append", AddNode.getDOMElement(), RemoveNode.getDOMElement())
}

export function getModuleGlobalVar(varName) {
	switch(varName) {
		case "AsideContextMenu":
			return AsideContextMenu
		case "AddNode":
			return AddNode
		case "RemoveNode":
			return RemoveNode
	}
}
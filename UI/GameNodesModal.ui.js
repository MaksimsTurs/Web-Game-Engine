import UIElement from "../UI-Engine/core/UIElement.core.js"

import * as GameNodesModalList from "./GameNodesModalList.ui.js"

import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

let GameNodesModalContainer = null
let GameNodesModalBody = null
let GameNodesModalHeader = null
let GameNodesModalHeaderTitle = null
let GameNodesModalHeaderTitleText = null
let GameNodesModalCloseButton = null

function closeNodesModal() {
	DeinitGameNodesModal()
	localStorage.removeItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY)
}

export function DeinitGameNodesModal() {
	//Deinit nodes modal list
	GameNodesModalList.DeinitGameNodesModalList()
	//Remove nodes
	DOMElementManager.remove(
		GameNodesModalCloseButton,
		GameNodesModalHeaderTitleText,
		GameNodesModalHeaderTitle,
		GameNodesModalHeader,
		GameNodesModalBody,
		GameNodesModalContainer
	)
	//Remove references
	GameNodesModalContainer = null
	GameNodesModalBody = null
	GameNodesModalHeader = null
	GameNodesModalHeaderTitle = null
	GameNodesModalHeaderTitleText = null
	GameNodesModalCloseButton = null
}

export function InitGameNodesModal() {
	const CONTAINERS_TAG_NAME = "div"

	//Create close button
	GameNodesModalCloseButton = new UIElement("button")
	GameNodesModalCloseButton
		.set("setAttribute", "class", "game-nodes-modal-body-close-button rflex-center-center-none")
		.set("innerHTML", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>')
		.addEvent("click", closeNodesModal)

	//Create header title text
	GameNodesModalHeaderTitleText = new UIElement("p")
	GameNodesModalHeaderTitleText
		.set("textContent", "Node types")

	//Create header title container
	GameNodesModalHeaderTitle = new UIElement(CONTAINERS_TAG_NAME)
	GameNodesModalHeaderTitle
		.set("setAttribute", "class", "rflex-center-center-small")
		.set("innerHTML", '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>')
		.set("insertAdjacentElement", "beforeend", GameNodesModalHeaderTitleText.getDOMElement())

	//Create modal body header
	GameNodesModalHeader = new UIElement("section")
	GameNodesModalHeader
		.set("setAttribute", "class", "game-nodes-modal-body-header rflex-center-spacebetween-none")
		.set("append", GameNodesModalHeaderTitle.getDOMElement(), GameNodesModalCloseButton.getDOMElement())

	//Create modal body
	GameNodesModalBody = new UIElement(CONTAINERS_TAG_NAME)
	GameNodesModalBody
		.set("setAttribute", "class", "game-nodes-modal-body")
		.set("appendChild", GameNodesModalHeader.getDOMElement())

	//Create root element
	GameNodesModalContainer = new UIElement(CONTAINERS_TAG_NAME)
	GameNodesModalContainer
		.set("setAttribute", "class", "game-nodes-modal game-nodes-modal-hidden rflex-center-center-none")
		.set("appendChild", GameNodesModalBody.getDOMElement())

	//Append modal in to the body
	document.getElementById("body").appendChild(GameNodesModalContainer.getDOMElement())
}

export function getModuleGlobalVar(varName) {
	switch(varName) {
		case "GameNodesModalContainer":
			return GameNodesModalContainer
		case "GameNodesModalBody":
			return GameNodesModalBody
		case "GameNodesModalBody":
			return GameNodesModalBody
		case "GameNodesModalHeader":
			return GameNodesModalHeader
		case "GameNodesModalHeaderTitle":
			return GameNodesModalHeaderTitle
		case "GameNodesModalHeaderTitleText":
			return GameNodesModalHeaderTitleText
		case "GameNodesModalHeaderTitleText":
			return GameNodesModalHeaderTitleText
		case "GameNodesModalCloseButton":
			return GameNodesModalCloseButton
	}
}
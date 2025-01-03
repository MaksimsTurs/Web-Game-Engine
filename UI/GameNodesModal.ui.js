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
}

export function DeinitGameNodesModal() {
	//Deinit nodes modal list
	GameNodesModalList.DeinitGameNodesModalList()
	//Remove event listener
	GameNodesModalCloseButton?.removeEventListener("click", closeNodesModal)
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
	
	//Create elements
	GameNodesModalContainer = document.createElement(CONTAINERS_TAG_NAME)
	GameNodesModalBody = document.createElement(CONTAINERS_TAG_NAME)
	GameNodesModalHeader = document.createElement(CONTAINERS_TAG_NAME)
	GameNodesModalHeaderTitle = document.createElement(CONTAINERS_TAG_NAME)
	GameNodesModalHeaderTitleText = document.createElement("p")
	GameNodesModalCloseButton = document.createElement("button")
	//Set selectors
	GameNodesModalContainer.classList.add(...["game-nodes-modal", "game-nodes-modal-hidden", "rflex-center-center-none"])
	GameNodesModalBody.classList.add("game-nodes-modal-body")
	GameNodesModalHeader.classList.add(...["game-nodes-modal-body-header", "rflex-center-spacebetween-none"])
	GameNodesModalHeaderTitle.classList.add("rflex-center-center-small")
	GameNodesModalCloseButton.classList.add(...["game-nodes-modal-body-close-button", "rflex-center-center-none"])
	//Append childrens and insert HTML	
	GameNodesModalHeaderTitleText.textContent = "Node types"
	GameNodesModalCloseButton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
	GameNodesModalHeaderTitle.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-workflow"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>'
	GameNodesModalHeaderTitle.insertAdjacentElement("beforeend", GameNodesModalHeaderTitleText)
	GameNodesModalHeader.appendChild(GameNodesModalHeaderTitle)
	GameNodesModalHeader.appendChild(GameNodesModalCloseButton)
	//Append childrens in to parent elements
	GameNodesModalBody.appendChild(GameNodesModalHeader)
	GameNodesModalContainer.appendChild(GameNodesModalBody)
	//Add event listener
	GameNodesModalCloseButton.addEventListener("click", closeNodesModal)	
	//Append Modal in to body
	document.getElementById("body").appendChild(GameNodesModalContainer)
}

export function getNode(nodeName) {
	switch(nodeName) {
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
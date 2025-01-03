import * as GameNodesModal from "./GameNodesModal.ui.js"

import { NODE_TYPES_ARRAY, MIN_NODE_NAME_LENGTH } from "../Game-Engine/const-enum.core.js"

import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

let GameNodesListForm = null
let GameNodesList = null
let NewNodeNameInput = null
let NewNodeFormSubmitButton = null
let NewNodeInputAndButtonContainer = null
let NewNodeValidationError = null
let NewNodeTypeButtons = []

let newGameNodeData = null

export function DeinitGameNodesModalList() {
	DOMElementManager.remove(
		...NewNodeTypeButtons,
		NewNodeValidationError,
		NewNodeNameInput,
		NewNodeFormSubmitButton,
		NewNodeInputAndButtonContainer,
		GameNodesList,
		GameNodesListForm
	)

	GameNodesListForm = null
	GameNodesList = null
	NewNodeNameInput = null
	NewNodeFormSubmitButton = null
	NewNodeInputAndButtonContainer = null
	NewNodeValidationError = null
	NewNodeTypeButtons = []

	newGameNodeData = null
}

export function InitGameNodesModalList() {
	const SELECTED_ITEM_SELECTOR = "game-nodes-list-item-selected"
	const CLFLEX_CONTAINER_SELECTOR = "cflex-none-none-small"

	//Init root elements
	GameNodesListForm = document.createElement("form")
	GameNodesList = document.createElement("div")

	//Set css classes
	GameNodesListForm.setAttribute("class", CLFLEX_CONTAINER_SELECTOR)
	GameNodesList.setAttribute("class", CLFLEX_CONTAINER_SELECTOR)

	let index = 0
	let length = NODE_TYPES_ARRAY.length
	
	//Create and append buttons of game nodes types in to "GameNodesList"
	while(index < length) {
		const button = document.createElement("button")
		const NODE_ITEM = NODE_TYPES_ARRAY[index]

		button.classList.add("game-nodes-list-item")
		button.setAttribute("type", "button")
		button.textContent = NODE_ITEM.typeName.get()
		button.addEventListener("click", function(event) {
			const clickedNode = event.target
			const isClickNodeSelected = clickedNode.classList.contains(SELECTED_ITEM_SELECTOR)
			
			if(isClickNodeSelected) {
				//Remove selected class selector when clicking of selected item
				clickedNode.classList.remove(SELECTED_ITEM_SELECTOR)
			} else {
				//Remove selected class selector from another element and set this selector to clicked item
				GameNodesList.querySelector(`.${SELECTED_ITEM_SELECTOR}`)?.classList?.remove(SELECTED_ITEM_SELECTOR)
				clickedNode.classList.add(SELECTED_ITEM_SELECTOR)
			}

			//Set selected node type for new node
			newGameNodeData = { type: NODE_ITEM.type, typeName: NODE_ITEM.typeName, name: "", childrens: {}}
		})

		GameNodesList.appendChild(button)
		NewNodeTypeButtons.push(button)
		index++
	}

	//Create container for error message, submit button and input for new node name
	NewNodeNameInput = document.createElement("input")
	NewNodeFormSubmitButton = document.createElement("button")
	NewNodeInputAndButtonContainer = document.createElement("div")
	NewNodeValidationError = document.createElement("section")

	NewNodeValidationError.classList.add("game-nodes-input-error")
	NewNodeValidationError.setAttribute("hidden", "true")

	NewNodeNameInput.setAttribute("placeholder", "Node name")
	NewNodeNameInput.classList.add("game-nodes-node-name-input")

	NewNodeFormSubmitButton.setAttribute("disabled", "true")
	NewNodeFormSubmitButton.textContent = "Insert new node"
	NewNodeFormSubmitButton.classList.add("game-nodes-form-submit-button")

	NewNodeInputAndButtonContainer.classList.add(...["game-nodes-new-node-data-container", CLFLEX_CONTAINER_SELECTOR])
	NewNodeInputAndButtonContainer.appendChild(NewNodeNameInput)
	NewNodeInputAndButtonContainer.appendChild(NewNodeValidationError)
	NewNodeInputAndButtonContainer.appendChild(NewNodeFormSubmitButton)

	//Append it all to root node
	GameNodesListForm.appendChild(GameNodesList)
	GameNodesListForm.appendChild(NewNodeInputAndButtonContainer)

	//Append it all to modal
	GameNodesModal.getNode("GameNodesModalContainer").querySelector(".game-nodes-modal-body").appendChild(GameNodesListForm)

	GameNodesListForm.addEventListener("submit", function(event) {
		event.preventDefault()

		//Validate node name
		if(NewNodeNameInput.value.length < MIN_NODE_NAME_LENGTH) {
			NewNodeValidationError.textContent = "Node name is not correct!"
			NewNodeValidationError.removeAttribute("hidden")
		} else if(!newGameNodeData) {
			//Validate not selected new node type
			NewNodeValidationError.textContent = "You need to select node type!"
			NewNodeValidationError.removeAttribute("hidden")
		} else {
			//Create node 
			let data = { type: newGameNodeData.type, typeName: newGameNodeData.typeName, name: NewNodeNameInput.value, childrens: {}}
			//Deinit nodes list
			DeinitGameNodesModalList()
			//Hidde nodes modal
			GameNodesModal.getNode("GameNodesModalContainer").classList.add("game-nodes-modal-hidden")
		}
	})
}

export function getNode(nodeName) {
	switch(nodeName) {
		case "GameNodesListForm":
			return GameNodesListForm
		case "GameNodesList":
			return GameNodesList
		case "NewNodeNameInput":
			return NewNodeNameInput
		case "NewNodeFormSubmitButton":
			return NewNodeFormSubmitButton
		case "NewNodeInputAndButtonContainer":
			return NewNodeInputAndButtonContainer
		case "NewNodeValidationError":
			return NewNodeValidationError
		case "NewNodeTypeButtons":
			return NewNodeTypeButtons
	}
}
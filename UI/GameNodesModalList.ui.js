import UIElement from "../UI-Engine/core/UIElement.core.js"
import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

import * as GameNodesModal from "./GameNodesModal.ui.js"
import * as AsideMenu from "./AsideMenu.ui.js"

import { NODE_TYPES_ARRAY, MIN_NODE_NAME_LENGTH } from "../Game-Engine/const-enum.core.js"
import { LOCAL_STORAGE_ADD_NODE_POSITION_KEY } from "./const.js"

let GameNodesListForm = null
let GameNodesList = null
let NewNodeNameInput = null
let NewNodeFormSubmitButton = null
let NewNodeInputAndButtonContainer = null
let NewNodeValidationError = null
let NewNodeTypeButtons = []

let newGameNodeData = null

export function DeinitGameNodesModalList() {
	//Remove nodes
	DOMElementManager.remove(
		...NewNodeTypeButtons,
		NewNodeValidationError,
		NewNodeFormSubmitButton,
		NewNodeInputAndButtonContainer,
		NewNodeNameInput,
		GameNodesList,
		GameNodesListForm
	)
	//Remove references
	GameNodesListForm = null
	GameNodesList = null
	NewNodeNameInput = null
	NewNodeFormSubmitButton = null
	NewNodeInputAndButtonContainer = null
	NewNodeValidationError = null
	NewNodeTypeButtons = []
	newGameNodeData = null
}

function insertNodeGameNode(event) {
	event.preventDefault()

	if(NewNodeNameInput.get("value").length < MIN_NODE_NAME_LENGTH) {
		NewNodeValidationError.set("textContent", "Node name is not correct!")
		NewNodeValidationError.set("removeAttribute", "hidden")
	} else if(!newGameNodeData) {
		NewNodeValidationError.set("textContent", "You need to select node type!")
		NewNodeValidationError.set("removeAttribute", "hidden")
	} else {	
		//Create aside menu node 
		let data = { 
			[NewNodeNameInput.get("value")]: {
				type: newGameNodeData.type, 
				typeName: newGameNodeData.typeName, 
				name: NewNodeNameInput.get("value"), 
				childrens: {}
			}
		}

		//Remove nodes modal and nodes modal list
		GameNodesModal.DeinitGameNodesModal()
		DeinitGameNodesModalList()

		AsideMenu
			.getModuleGlobalVar("AsideMenuNodes")
			.update(function(tree) {
				let position = localStorage.getItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY)

				if(position === "root") {
					return data
				}

				const awayToNewNode = position.replace(/root./, "").split(/\./)

				awayToNewNode.reduce(function(prev, curr, index) {
					if(index === awayToNewNode.length - 1) {
						prev[curr].childrens = data
						return
					}
					
					return prev[curr].childrens
				}, tree)

				return tree
			})
	}
}
 
function inputNewNodeName() {
	if(isAllNodeDataWasSetted()) {
		NewNodeFormSubmitButton.set("removeAttribute", "disabled")
	} else {
		NewNodeFormSubmitButton.set("setAttribute", "disabled", "true")
	}
}

function isAllNodeDataWasSetted() {
	return NewNodeNameInput.get("value").length > MIN_NODE_NAME_LENGTH && newGameNodeData
}

export function InitGameNodesModalList() {
	const SELECTED_ITEM_SELECTOR = "game-nodes-list-item-selected"
	const CLFLEX_CONTAINER_SELECTOR = "cflex-none-none-small"

	//Create input
	NewNodeNameInput = new UIElement("input")
	NewNodeNameInput
		.set("setAttribute", "placeholder", "New node name")
		.set("setAttribute", "name", "node-name")
		.set("setAttribute", "class", "game-nodes-node-name-input")
		.addEvent("input", inputNewNodeName)
	
	//Create submit button
 	NewNodeFormSubmitButton = new UIElement("button")
	NewNodeFormSubmitButton
		.set("setAttribute", "disabled", "true")
		.set("setAttribute", "class", "game-nodes-form-submit-button")
		.set("textContent", "Insert new node")

	//Create validation error message container
	NewNodeValidationError = new UIElement("section")
	NewNodeValidationError
		.set("setAttribute", "hidden", "true")
		.set("setAttribute", "class", "game-nodes-input-error")
	
	//Create wrapper for input, submit button and validation container
	NewNodeInputAndButtonContainer = new UIElement("div")
	NewNodeInputAndButtonContainer
		.set("setAttribute", "class", `game-nodes-new-node-data-container ${CLFLEX_CONTAINER_SELECTOR}`)
		.set("append", NewNodeNameInput.getDOMElement(), NewNodeValidationError.getDOMElement(), NewNodeFormSubmitButton.getDOMElement())
	
	//Create nodes list
	GameNodesList = new UIElement("div")
	GameNodesList.
		set("setAttribute", "class", CLFLEX_CONTAINER_SELECTOR)
	
	//Create node list items
	let index = 0
	let length = NODE_TYPES_ARRAY.length

	while(index < length) {
		const Button = new UIElement("button")
		const NODE_ITEM = NODE_TYPES_ARRAY[index]

		Button
			.set("setAttribute", "type", "button")
			.set("setAttribute", "class", "game-nodes-list-item")
			.set("append", NODE_ITEM.typeName.get())
			.addEvent("click", function(event) {
				const clickedNode = event.target
				const isClickedNodeSelected = clickedNode.classList.contains(SELECTED_ITEM_SELECTOR)
				
				if(isClickedNodeSelected) {
					clickedNode.classList.remove(SELECTED_ITEM_SELECTOR)
					newGameNodeData = null
					NewNodeFormSubmitButton.set("setAttribute", "disabled", "true")
				} else {
					//Remove SELECTED_ITEM_SELECTOR from element and add him to another
					GameNodesList.getDOMElement().querySelector(`.${SELECTED_ITEM_SELECTOR}`)?.classList?.remove(SELECTED_ITEM_SELECTOR)
					clickedNode.classList.add(SELECTED_ITEM_SELECTOR)
					newGameNodeData = { type: NODE_ITEM.type, typeName: NODE_ITEM.typeName, name: "", childrens: {}}

					if(isAllNodeDataWasSetted()) {
						NewNodeFormSubmitButton.set("removeAttribute", "disabled")
					}
				}
			})

		GameNodesList.set("appendChild", Button.getDOMElement())
		NewNodeTypeButtons.push(Button)
		index++
	}

	//Create root element
	GameNodesListForm = new UIElement("form")
	GameNodesListForm
		.set("setAttribute", "class", CLFLEX_CONTAINER_SELECTOR)
		.set("append", GameNodesList.getDOMElement(), NewNodeInputAndButtonContainer.getDOMElement())
		.addEvent("submit", insertNodeGameNode)

	//Append nodes list in to the game nodes modal
	GameNodesModal
		.getModuleGlobalVar("GameNodesModalContainer")
		.getDOMElement()
		.querySelector(".game-nodes-modal-body")
		.appendChild(GameNodesListForm.getDOMElement())
}

export function getModuleGlobalVar(varName) {
	switch(varName) {
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
import ComponentConstructor from "../core/ComponentConstructor.core.js"
import ComponentMemoryManagement from "../core/Component-Memory-Management/ComponentMemoryManagement.core.js"

import { NODE_TYPES_ARRAY } from "../../Game-Engine/const-enum.core.js"

export const AsideMenuResizer = new ComponentConstructor(document.querySelector(".aside-menu-resizer"))
export const GameNodesModal = new ComponentConstructor(document.querySelector(".game-nodes-modal"))
const AsideMenuContainer = new ComponentConstructor(document.querySelector(".aside-menu-container"))

//Some constanst
const ASIDE_MENU_MAX_WIDTH_FACTOR = 4
const ASIDE_MENU_MIN_WIDTH_FACTOR = 9
const WINDOW_WIDTH = window.innerWidth

//Width of the aside menu container
let width = 0
//Start position in for aside menu container
let x = 0
//Reference on context buttons
export let AsideMenuContextmenuButtons = null

export function documentResizeAsideMenuContainer(event) {
	const newWidth = (event.clientX - x) + width
	const minWidth = WINDOW_WIDTH / ASIDE_MENU_MIN_WIDTH_FACTOR
	const maxWidth = WINDOW_WIDTH / ASIDE_MENU_MAX_WIDTH_FACTOR

	if(newWidth < minWidth) {
		return
	} else if(newWidth < maxWidth) {
		AsideMenuContainer.node.style.width = `${newWidth}px`
		return
	} 
}

function ContextMenuButtonsInit() {
	const AddNode = new ComponentConstructor("button")
	const RemoveNode = new ComponentConstructor("button")

	AddNode.node.textContent = "Add new node"
	RemoveNode.node.textContent = "Remove node"

	AddNode.node.classList.add("aside-menu-contextmenu-button")
	RemoveNode.node.classList.add("aside-menu-contextmenu-button")

	return { AddNode, RemoveNode }
}

function removeDocumentAsideMenuResizeEvent() {
	document.body.removeEventListener("mousemove", documentResizeAsideMenuContainer)

	//Reset aside menu variabels
	x = 0
	width = 0

	//Reset resizer color
	AsideMenuResizer.node.style.transition = "all 0.15s ease"
	AsideMenuResizer.node.style.backgroundColor = "rgb(36, 36, 116)"
}

function setAsideMenuContainerWidthAndPosition(event) {
	x = event.clientX	
	width = parseFloat(getComputedStyle(AsideMenuContainer.node).width)

	AsideMenuResizer.node.style.transition = "all 0.15s ease"
	AsideMenuResizer.node.style.backgroundColor = "rgb(94, 73, 198)"

	document.body.addEventListener("mousemove", documentResizeAsideMenuContainer)
}

function openAsideMenuContextmenu(event) {
	if(AsideMenuContextmenuButtons) {
		ComponentMemoryManagement.remove(AsideMenuContextmenuButtons.AddNode, AsideMenuContextmenuButtons.RemoveNode)
		AsideMenuContextmenuButtons = null
	}

	event.preventDefault()
	
	//For deleting buttons and their references
	let buttonsReferences = []

	const contextMenu = document.getElementById("aside-menu-contextmenu")
	const xPosition = event.clientX
	const yPosition = event.clientY

	AsideMenuContextmenuButtons = ContextMenuButtonsInit()
	AsideMenuContextmenuButtons.AddNode.addEvent("click",openGameNodesModal)

	contextMenu.style.left = `${xPosition}px`
	contextMenu.style.top = `${yPosition - 40}px`

	contextMenu.appendChild(AsideMenuContextmenuButtons.AddNode.node)
	contextMenu.appendChild(AsideMenuContextmenuButtons.RemoveNode.node)

	function closeGameNodesModal() {
		//Hidde Game nodes modal
		GameNodesModal.node.classList.add("game-nodes-modal-hidden")
	}

	function openGameNodesModal() {
		ComponentMemoryManagement.remove(AsideMenuContextmenuButtons.AddNode, AsideMenuContextmenuButtons.RemoveNode.node)
		AsideMenuContextmenuButtons = null

		let gameNodesModalCloseButton = document.querySelector(".game-nodes-modal-body-close-button")
		let gameNodesList = GameNodesModal.node.querySelector("#game-nodes-list")

		let index = 0
		let length = NODE_TYPES_ARRAY.length

		while(index < length) {
			const button = document.createElement("button")

			button.classList.add("game-nodes-list-item")
			button.textContent = NODE_TYPES_ARRAY[index].typeName.get()

			gameNodesList.appendChild(button)
			buttonsReferences.push(button)
			index++
		}

		//Show Game nodes modal
		GameNodesModal.node.classList.remove("game-nodes-modal-hidden")
		gameNodesModalCloseButton.addEventListener("click", closeGameNodesModal)
		gameNodesModalCloseButton = null
		gameNodesList = null
	}
}

export default function() {		
	AsideMenuResizer.addEvent("mousedown", setAsideMenuContainerWidthAndPosition)
	AsideMenuResizer.addEvent("mouseup", removeDocumentAsideMenuResizeEvent)
	AsideMenuContainer.addEvent("contextmenu", openAsideMenuContextmenu)
}
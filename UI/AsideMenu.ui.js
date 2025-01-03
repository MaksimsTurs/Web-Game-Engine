import UIState from "../UI-Engine/core/UIState.core.js"
import UIElement from "../UI-Engine/core/UIElement.core.js"
import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

import * as ContextMenu from "./AsideContextMenu.ui.js"

import { LOCAL_STORAGE_ADD_NODE_POSITION_KEY } from "./const.js"

import isObjectEmpty from "../util/isObjectEmpty.util.js"

const asideMenuResizer = document.querySelector(".aside-menu-resizer")
const asideMenuContainer = document.querySelector(".aside-menu-container")

//Some constanst
const ASIDE_MENU_MAX_WIDTH_FACTOR = 3
const ASIDE_MENU_MIN_WIDTH_FACTOR = 8
const WINDOW_WIDTH = window.innerWidth

//Width of the aside menu container
let width = 0

const AsideMenuNodes = new UIState({})

AsideMenuNodes.bind(renderAsideMenuNodesList, true)

function renderAsideMenuNodesList(nodes) {
	const isEmpty = isObjectEmpty(nodes)

	let containerChild = null

	if(isEmpty && !DOMElementManager.isElementExist("aside-menu-nodes-list-empty")) {
		containerChild = emptyAsideMenuNodesList()
	}

	asideMenuContainer.querySelector(".aside-menu-nodes-list").appendChild(containerChild)
	localStorage.removeItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY)
}

function emptyAsideMenuNodesList() {
	const EmptyNodesListContainer = new UIElement("div")
	EmptyNodesListContainer
		.set("innerHTML", '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-package-open"><path d="M12 22v-9"/><path d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"/><path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13"/><path d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"/></svg>')
		.set("append", "Nodes list is empty!")
		.set("setAttribute", "class", "aside-menu-nodes-list-empty rflex-center-center-medium")
		.set("setAttribute", "data-node", "root")

	return EmptyNodesListContainer.getDOMElement()
}

function setAsideMenuPosition(element, x, y) {
	element.style.left = x
	element.style.top = y
}

function openAsideMenuContextMenu(event) {
	if(event.srcElement === asideMenuResizer) {
		return
	}

	event.preventDefault()
	
	const xPosition = event.clientX
	const yPosition = event.clientY

	localStorage.setItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY, event.srcElement.dataset.node)
	const AsideContextMenu = ContextMenu.getModuleGlobalVar("AsideContextMenu")

	if(AsideContextMenu) {
		//Set new position to context menu when context menu exist
		setAsideMenuPosition(AsideContextMenu.getDOMElement(), `${xPosition}px`, `${yPosition - 40}px`)
	} else {
		//Init context menu when not exist
		ContextMenu.InitAsideContextMenu()
		//Set style to the context menu
		const element = ContextMenu.getModuleGlobalVar("AsideContextMenu").getDOMElement()
		setAsideMenuPosition(element, `${xPosition}px`, `${yPosition - 40}px`)
		//Append context menu in to the aside menu container
		asideMenuContainer.appendChild(element)
	}	
}

function removeDocumentAsideMenuResizeEvent() {
	width = 0
	document.body.removeEventListener("mousemove", documentResizeAsideMenuContainer)
}

function setAsideMenuContainerWidth() {
	width = parseFloat(getComputedStyle(asideMenuResizer).width)
	document.body.addEventListener("mousemove", documentResizeAsideMenuContainer)
	ContextMenu.DeinitAsideContextMenu()
}

export function documentResizeAsideMenuContainer(event) {
	const newWidth = event.clientX + width
	const minWidth = WINDOW_WIDTH / ASIDE_MENU_MIN_WIDTH_FACTOR
	const maxWidth = WINDOW_WIDTH / ASIDE_MENU_MAX_WIDTH_FACTOR

	if(newWidth < maxWidth && !(newWidth < minWidth)) {
		asideMenuContainer.style.width = `${newWidth}px`
	} 
}

export function getModuleGlobalVar(varName) {
	switch(varName) {
		case "AsideMenuNodes":
			return AsideMenuNodes
	}
}

export default function() {		
	asideMenuResizer.addEventListener("mousedown", setAsideMenuContainerWidth)
	asideMenuResizer.addEventListener("mouseup", removeDocumentAsideMenuResizeEvent)
	asideMenuContainer.addEventListener("contextmenu", openAsideMenuContextMenu)
}
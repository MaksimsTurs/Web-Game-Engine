import * as ContextMenu from "./AsideContextMenu.ui.js"

const asideMenuResizer = document.querySelector(".aside-menu-resizer")
const asideMenuContainer = document.querySelector(".aside-menu-container")

//Some constanst
const ASIDE_MENU_MAX_WIDTH_FACTOR = 4
const ASIDE_MENU_MIN_WIDTH_FACTOR = 9
const WINDOW_WIDTH = window.innerWidth

//Width of the aside menu container
let width = 0

function openAsideMenuContextMenu(event) {
	event.preventDefault()

	const xPosition = event.clientX
	const yPosition = event.clientY

	if(ContextMenu.getNode("AsideContextMenu")) {
		//Set new position to context menu when context menu exist
		ContextMenu.setStyle("AsideContextMenu", "left", `${xPosition}px`)
		ContextMenu.setStyle("AsideContextMenu", "top", `${yPosition - 40}px`)
	} else {
		//Init context menu when not exist
		ContextMenu.InitAsideContextMenu()
		//Set style to context menu
		ContextMenu.setStyle("AsideContextMenu", "left", `${xPosition}px`)
		ContextMenu.setStyle("AsideContextMenu", "top", `${yPosition - 40}px`)
		//Append context menu in to the aside menu container
		asideMenuContainer.appendChild(ContextMenu.getNode("AsideContextMenu"))
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

export default function() {		
	asideMenuResizer.addEventListener("mousedown", setAsideMenuContainerWidth)
	asideMenuResizer.addEventListener("mouseup", removeDocumentAsideMenuResizeEvent)
	asideMenuContainer.addEventListener("contextmenu", openAsideMenuContextMenu)
}
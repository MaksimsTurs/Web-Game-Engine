import UIElement from "../UI-Engine/core/UIElement.core.js"
import DOMElementManager from "../UI-Engine/core/DOM-Element-Manager/DOMElementManager.core.js"

const projectActionsButton = document.getElementById("project-actions-button")

let CreateProjectButton = null
let SaveProjectButton = null
let SaveProjectAsButton = null
let OpenProjectButton = null
let ProjectActionsList = null

function openMenuListAndAppendButtons() {
	//Init navogator list
	InitNavigator()
	//Append list in to the menu button
	projectActionsButton.appendChild(ProjectActionsList.getDOMElement())
}

function closeMenuListAndRemoveButtons() {
	DeinitNavigator()
}

export function DeinitNavigator() {
	DOMElementManager.remove(
		CreateProjectButton,
		SaveProjectButton,
		SaveProjectAsButton,
		OpenProjectButton,
		ProjectActionsList,
	)
	
	CreateProjectButton = null
	SaveProjectButton = null
	SaveProjectAsButton = null
	OpenProjectButton = null
	ProjectActionsList = null
}

function InitNavigator() {
	const BUTTONS_CLASS_NAME = "navigator-menu-button"
	const BUTTONS_NODE_NAME = "button"

	//Create button
	CreateProjectButton = new UIElement(BUTTONS_NODE_NAME)
	CreateProjectButton
		.set("setAttribute", "class", BUTTONS_CLASS_NAME)
		.set("textContent", "Create project")
	
	//Create button
	SaveProjectButton = new UIElement(BUTTONS_NODE_NAME)
	SaveProjectButton
		.set("setAttribute", "class", BUTTONS_CLASS_NAME)
		.set("textContent", "Save project")
	
	//Create button
	SaveProjectAsButton = new UIElement(BUTTONS_NODE_NAME)
	SaveProjectAsButton
		.set("setAttribute", "class", BUTTONS_CLASS_NAME)
		.set("textContent", "Save project as")
	
	//Create button
	OpenProjectButton = new UIElement(BUTTONS_NODE_NAME)
	OpenProjectButton
		.set("setAttribute", "class", BUTTONS_CLASS_NAME)
		.set("textContent", "Open project")

	//Create navigator list
	ProjectActionsList = new UIElement("ul")
	ProjectActionsList
		.set("setAttribute", "class", "navigator-menu-list")
		.set("append", CreateProjectButton.getDOMElement(), SaveProjectButton.getDOMElement(), SaveProjectAsButton.getDOMElement(), OpenProjectButton.getDOMElement())
}

export default function() {
	projectActionsButton.addEventListener("mouseenter", openMenuListAndAppendButtons)
	projectActionsButton.addEventListener("mouseleave", closeMenuListAndRemoveButtons)
}
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
	projectActionsButton.appendChild(ProjectActionsList)
}

function closeMenuListAndRemoveButtons() {
	DeinitNavigator()
}

function InitNavigator() {
	const BUTTONS_CLASS_NAME = "navigator-menu-button"
	const BUTTONS_NODE_NAME = "button"

	CreateProjectButton = document.createElement(BUTTONS_NODE_NAME)
	SaveProjectButton = document.createElement(BUTTONS_NODE_NAME)
	SaveProjectAsButton = document.createElement(BUTTONS_NODE_NAME)
	OpenProjectButton = document.createElement(BUTTONS_NODE_NAME)

	CreateProjectButton.classList.add(BUTTONS_CLASS_NAME)
	SaveProjectButton.classList.add(BUTTONS_CLASS_NAME)
	SaveProjectAsButton.classList.add(BUTTONS_CLASS_NAME)
	OpenProjectButton.classList.add(BUTTONS_CLASS_NAME)

	CreateProjectButton.textContent = "Create project"
	SaveProjectButton.textContent = "Save project"
	SaveProjectAsButton.textContent = "Save project as"
	OpenProjectButton.textContent = "Open project"
	
	ProjectActionsList = document.createElement("ul")

	ProjectActionsList.classList.add("navigator-menu-list")
	
	ProjectActionsList.appendChild(CreateProjectButton)
	ProjectActionsList.appendChild(SaveProjectButton)
	ProjectActionsList.appendChild(SaveProjectAsButton)
	ProjectActionsList.appendChild(OpenProjectButton)
}

function DeinitNavigator() {
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

export default function() {
	projectActionsButton.addEventListener("mouseenter", openMenuListAndAppendButtons)
	projectActionsButton.addEventListener("mouseleave", closeMenuListAndRemoveButtons)
}
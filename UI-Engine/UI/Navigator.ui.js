import ComponentConstructor from "../core/ComponentConstructor.core.js"
import ComponentMemoryManagement from "../core/Component-Memory-Management/ComponentMemoryManagement.core.js"

const ProjectActionList = new ComponentConstructor(document.getElementById("project-actions-container"))

//References on elements
let HeaderMenuButtons = null

function NavigatorButtonsInit() {
	const CreateProjectButton = new ComponentConstructor("button")
	const SaveProjectButton = new ComponentConstructor("button")
	const SaveProjectAsButton = new ComponentConstructor("button")
	const OpenProjectButton = new ComponentConstructor("button")

	CreateProjectButton.node.textContent = "Create project"
	SaveProjectButton.node.textContent = "Save project"
	SaveProjectAsButton.node.textContent = "Save project as"
	OpenProjectButton.node.textContent = "Open project"

	CreateProjectButton.node.classList.add("navigator-menu-button")
	SaveProjectButton.node.classList.add("navigator-menu-button")
	SaveProjectAsButton.node.classList.add("navigator-menu-button")
	OpenProjectButton.node.classList.add("navigator-menu-button")

	return {
		CreateProjectButton,
		SaveProjectButton,
		SaveProjectAsButton,
		OpenProjectButton
	}
}

function appendButtonsInToList(event) {
	//Create navigation buttons and append all in to this list.
	const currentMenuList = event.target.children?.[0]

	HeaderMenuButtons = NavigatorButtonsInit()
	
	currentMenuList.appendChild(HeaderMenuButtons.CreateProjectButton.node)
	currentMenuList.appendChild(HeaderMenuButtons.OpenProjectButton.node)
	currentMenuList.appendChild(HeaderMenuButtons.SaveProjectAsButton.node)
	currentMenuList.appendChild(HeaderMenuButtons.SaveProjectButton.node)
}

function deleteMenuButtons() {
	//Delete buttons from memory and list.
	ComponentMemoryManagement.remove(HeaderMenuButtons.CreateProjectButton, HeaderMenuButtons.OpenProjectButton, HeaderMenuButtons.SaveProjectAsButton, HeaderMenuButtons.SaveProjectButton)
	HeaderMenuButtons = null
}

export default function() {
	ProjectActionList.addEvent("mouseenter", appendButtonsInToList)
	ProjectActionList.addEvent("mouseleave", deleteMenuButtons)
}
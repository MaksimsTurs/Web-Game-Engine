import 
	AsideMenu, 
	{ 
		documentResizeAsideMenuContainer, 
		AsideMenuResizer, 
		GameNodesModal, 
		AsideMenuContextmenuButtons 
	}
from "./UI-Engine/UI/AsideMenu.ui.js";
import Navigator from "./UI-Engine/UI/Navigator.ui.js";

import ComponentMemoryManagement from "./UI-Engine/core/Component-Memory-Management/ComponentMemoryManagement.core.js"

AsideMenu()
Navigator()

function documentClickListener(event) {
	document.body.removeEventListener("mousemove", documentResizeAsideMenuContainer)
	
	//Reset resizer color
	AsideMenuResizer.node.style.transition = "all 0.15s ease"
	AsideMenuResizer.node.style.backgroundColor = "rgb(36, 36, 116)"

	//Handle context menu close
	if(AsideMenuContextmenuButtons && event.target !== AsideMenuContextmenuButtons.AddNode.node && GameNodesModal.node.classList.contains("game-nodes-modal-hidden")) {
		ComponentMemoryManagement.remove(AsideMenuContextmenuButtons.AddNode, AsideMenuContextmenuButtons.RemoveNode)
	}
}

document.body.addEventListener("click", documentClickListener)
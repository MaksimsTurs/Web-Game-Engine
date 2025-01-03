"use strict";

// Build: vite build --target "esnext" --outDir "bin"

import AsideMenu, { documentResizeAsideMenuContainer } from "./UI/AsideMenu.ui.js";
import Navigator from "./UI/Navigator.ui.js";

import * as AsideContextMenu from "./UI/AsideContextMenu.ui.js";
import * as GameNodesModal from "./UI/GameNodesModal.ui.js";

import { LOCAL_STORAGE_ADD_NODE_POSITION_KEY } from "./UI/const.js";

Navigator()
AsideMenu()

document.body.addEventListener("click", function(event) {
  document.body.removeEventListener("mousemove", documentResizeAsideMenuContainer)

  const _GameNodesModalBody = GameNodesModal.getModuleGlobalVar("GameNodesModalBody")?.getDOMElement()
  const _AsideContextMenu = AsideContextMenu.getModuleGlobalVar("AsideContextMenu")?.getDOMElement()

	if(_AsideContextMenu && !_AsideContextMenu.contains(event.target)) {
		localStorage.removeItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY)
		AsideContextMenu.DeinitAsideContextMenu()
	}

	if(_GameNodesModalBody && !_GameNodesModalBody.contains(event.target)) {
		GameNodesModal.DeinitGameNodesModal()
	}
})
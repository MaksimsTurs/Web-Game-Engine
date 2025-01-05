import { LOCAL_STORAGE_ADD_NODE_POSITION_KEY } from "./const.js"

import UIElement from "../UI-Engine/core/UIElement.core.js"

import isObjectEmpty from "../util/isObjectEmpty.util.js"

let NodesListItems = []

function recursivelyCreateNodesListItem(node, root) {
	const rootNode = document.querySelector(`[data-node='${root}']`)
		
	for(let nodeName in node) {
		const currNodeDataset = `${root}.${node[nodeName].name}`
		const currNodeSize = currNodeDataset.split(/\./)
		
		const ListNodeContainer = new UIElement("div")
		const ListNodeName = new UIElement("p")

		ListNodeName
			.set("textContent", node[nodeName].name)
			.set("setAttribute", "class", "aside-menu-nodes-list-item")
			.set("setAttribute", "data-node", currNodeDataset)
			
			
		ListNodeContainer
			.set("setAttribute", "data-node", currNodeDataset)
			.set("appendChild", ListNodeName.getDOMElement())
			
		ListNodeName.getDOMElement().style.padding = `0.3rem 0.95rem 0.3rem ${0.5 * (currNodeSize.length + 1)}rem`

		NodesListItems.push(ListNodeContainer)
		rootNode.append(ListNodeContainer.getDOMElement())

		if(!isObjectEmpty(node[nodeName].childrens)) {
			recursivelyCreateNodesListItem(node[nodeName].childrens, currNodeDataset)
		}
	}
}

export function InitAsideMenuNodesList(nodes) {
	const root = localStorage.getItem(LOCAL_STORAGE_ADD_NODE_POSITION_KEY).replace(/root(\.)?/, "").split(/\./).filter(Boolean)

	if(root.length === 0) {
		recursivelyCreateNodesListItem(nodes, "root")
		return
	}

	//TODO: It will be not work when i wanna be update or change one of the node
	//Select new nodes that must be rendered
	//toRender will be not mutated, therefore I do not make a copy of this variable
	let toRender = nodes
	let index = 0
	let length = root.length

	while(index < length) {
		if(index === 0) {
			toRender =  nodes[root[0]]
			index++
			continue
		}
		
		toRender = toRender.childrens?.[root[index]]
		index++
	}

	recursivelyCreateNodesListItem(toRender.childrens, `root.${root.join(".")}`)
}

export function DeinitAsideMenuNodesList() {

}	
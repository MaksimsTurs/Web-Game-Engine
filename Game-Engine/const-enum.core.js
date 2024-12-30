import StringConstructor from "./Engine-Types/String-Constructor/StringConstructor.type.js"

export const CHARACTER_BODY_2D = new StringConstructor("2D_CHARACHTER_BODY", false)
export const COLLISION_BODY_2D = new StringConstructor("2D_COLLISION_BODY", false)
export const SPRITE =            new StringConstructor("SPRITE")
export const NODE_2D =           new StringConstructor("NODE_2D")
export const EMPTY_NODE =        new StringConstructor("NONE")

export const CharacterBody2D = new StringConstructor("2D Character Body", false)
export const CollisionBody2D = new StringConstructor("2D Collision Body", false)
export const Sprite =          new StringConstructor("Sprite", false)

export const NODE_TYPES_ARRAY = [
	{ type: CHARACTER_BODY_2D, typeName: CharacterBody2D },
	{ type: COLLISION_BODY_2D, typeName: CollisionBody2D },
	{ type: SPRITE,            typeName: Sprite }
]

export const NODE_DUMMY = {
	type: EMPTY_NODE,
	childrens: []
}
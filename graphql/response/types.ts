import { Character, Info } from "rickmortyapi"

export type QueryResponse = {
	character?: Character
	characters?: Info<Character[]>
}
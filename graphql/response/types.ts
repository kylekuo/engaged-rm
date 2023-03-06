import { Character, Info } from "rickmortyapi"

export type ResultInfo = {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
}

export type QueryResponse = {
	character?: Character;
	characters?: Info<Character[]>;
}
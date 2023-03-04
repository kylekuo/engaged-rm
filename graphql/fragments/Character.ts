export const CharacterFields = gql`
	fragment CharacterFields on Character {
		id
		name
		type
		status
		species
		gender
		image
		created
		origin {
			id
			name
			type
			dimension
			created
		}
		location {
			id
			name
			type
			dimension
			created
		}
		episode {
			id
			name
			episode
			air_date
			created
		} 
	}
`
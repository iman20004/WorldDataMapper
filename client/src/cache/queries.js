import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			firstName
			lastName
			email
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions {
		getAllRegions {
			_id
			owner
			name
			capital
			leader
			landmarks
			root
			parentId
			childrenIds
		}
	}
`;

export const GET_DB_ANCESTORS = gql`
	query GetDBAncestors($_id: String!) {
		getAllAncestors(_id: $_id) {
			_id
			owner
			name
			capital
			leader
			landmarks
			root
			parentId
			childrenIds
		}
	}
`;




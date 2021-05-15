import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			firstName
			lastName
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
		register(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
			email
			password
			firstName
			lastName
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const UPDATE = gql`
	mutation Update($email: String!, $password: String!, $firstName: String!, $lastName: String!, $_id: String!) {
		update(email: $email, password: $password, firstName: $firstName, lastName: $lastName, _id: $_id) {
			_id
			email
			password
			firstName
			lastName
		}
	}
`;

export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!, $index: Int!) {
		addRegion(region: $region, index: $index) {
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

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!) {
		deleteRegion(_id: $_id)
	}
`;

export const UPDATE_REGION = gql`
	mutation UpdateRegion($_id: String!, $value: String!, $field: String! ) {
		updateRegion(_id: $_id, value: $value, field: $field)
	}
`;

export const UPDATE_REGION_ARRAY = gql`
	mutation UpdateRegionArray($_id: String!, $newArray: [String!], $field: String! ) {
		updateRegionArray(_id: $_id, newArray: $newArray, field: $field)
	}
`;

export const ADD_LANDMARK = gql`
	mutation AddLandmark($_id: String!, $newLandmark: String!, $index: Int! ) {
		addLandmark(_id: $_id, newLandmark: $newLandmark, index: $index)
	}
`;

export const DELETE_LANDMARK = gql`
	mutation DeleteLandmark($_id: String!, $landmarkToDelete: String!) {
		deleteLandmark(_id: $_id, landmarkToDelete: $landmarkToDelete)
	}
`;

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
	mutation AddRegion($region: RegionInput!) {
		addRegion(region: $region) {
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

export const UPDATE_SORT = gql`
	mutation UpdateSort($_id: String!, $children: [String!] ) {
		updateSortRegions(_id: $_id, children: $children)
	}
`;

export const UPDATE_LANDMARKS = gql`
	mutation UpdateLandmarks($_id: String!, $value: [String!]) {
		updateLandmarks(_id: $_id, value: $value)
	}
`;

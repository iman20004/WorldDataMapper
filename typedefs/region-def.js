const { gql } = require('apollo-server');


const typeDefs = gql `
type Region {
	_id: String!
	owner: String!
	name: String!
	capital: String!
	leader: String!
	landmarks: [String]!
	root:  Boolean!
	parentId: String!
	childrenIds: [String]!
}
extend type Query {
	getAllRegions: [Region]
	getAllRootRegions: [Region]
	getRegionById(_id: String!): Region
	getAllAncestors(_id: String!): [Region]
	getChildren(_id: String!): [Region]
}
extend type Mutation {
	addRegion(region: RegionInput!, index: Int!): Region
	deleteRegion(_id: String!): Boolean
	updateRegion(_id: String!, value: String!, field: String!): String
	updateRegionArray(_id: String!, newArray: [String!], field: String!): String
	addLandmark(_id: String!, newLandmark: String!, index: Int!) : String
	deleteLandmark(_id: String!, landmarkToDelete: String!) : String
	editLandmark(_id: String!, oldLandmark: String!, newLandmark: String!) : String
	changeParent(_id: String!, index: Int!, newParentId: String!) : Boolean
}
input FieldInput {
	_id: String
	field: String
	value: String
}
input RegionInput {
	_id: String
	owner: String
	name: String
	capital: String
	leader: String
	landmarks: [String]
	root:  Boolean
	parentId: String
	childrenIds: [String]
}
`;

module.exports = { typeDefs: typeDefs }

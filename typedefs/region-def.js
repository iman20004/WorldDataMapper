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
}
extend type Query {
	getAllRegions: [Region]
	getAllRootRegions: [Region]
	getRegionById(_id: String!): Region
	getAllAncestors(_id: String!): [Region]
}
extend type Mutation {
	addRegion(region: RegionInput!): Region
	deleteRegion(_id: String!): Boolean
	updateRegion(_id: String!, value: String!, field: String!): String
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
}
`;

module.exports = { typeDefs: typeDefs }

const { gql } = require('apollo-server');


const typeDefs = gql `
type Map {
	_id: String!
	name: String!
	owner: String!
	regions: [Region]
}
type Region {
	_id: String!
	name: String!
	capital: String!
	leader: String!
	landmarks: [String]!
	root: Boolean!
	parentId: String!
}
extend type Query {
	getAllMaps: [Map]
	getMapById(_id: String!): Map 
}
extend type Mutation {
	addRegion(_id: String!, region: RegionInput!): String
	addMap(map: MapInput!): Map
	deleteMap(_id: String!): Boolean
	updateMapField(_id: String!, value: String!): String
}
input FieldInput {
	_id: String
	field: String
	value: String
}
input MapInput {
	_id: String
	name: String
	owner: String
	regions: [RegionInput]
}
input RegionInput {
	_id: String
	name: String
	capital: String
	leader: String
	landmarks: [String]
	root:  Boolean
	parentId: String
}
`;

module.exports = { typeDefs: typeDefs }

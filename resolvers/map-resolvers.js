const ObjectId = require('mongoose').Types.ObjectId;
const Map = require('../models/map-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllMaps: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const maps = await Map.find({owner: _id});
			if(maps) return (maps);

		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getMapById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const map = await Map.findOne({_id: objectId});
			if(map) return map;
			else return ({});
		},
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addRegion: async(_, args) => {
			const { _id, region, index } = args;
			const listId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Map.findOne({_id: listId});
			if(!found) return ('Map not found');
			if(region._id === '') region._id = objectId;
			let listRegions = found.regions;
		        if(index < 0) listRegions.push(region);
			else listRegions.splice(index, 0, region);
			
			const updated = await Map.updateOne({_id: listId}, { regions: listRegions });

			if(updated) return (region._id);
			else return ('Could not add region');
		},

		/** 
		 	@param 	 {object} args - an empty map object
			@returns {object} the new map on success
		**/
		addMap: async (_, args) => {
			console.log("good good")
			const { map } = args;
			const objectId = new ObjectId();
			const { _id, name, owner, regions} = map;
			const newMap = new Map({
				_id: objectId,
				name: name,
				owner: owner,
				regions: regions
			});
			const updated = await newMap.save();
			if(updated) {
				console.log(newMap)
				return newMap;
			}
		}

	}
}

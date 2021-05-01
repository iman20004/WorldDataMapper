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
		 	@param 	 {object} args - a map id and an empty region object
			@returns {string} the objectID of the item or an error message
		**/
		addRegion: async(_, args) => {
			const { _id, region } = args;
			const mapId = new ObjectId(_id);
			const found = await Map.findOne({_id: mapId});
			if(!found) return ('Map not found');

			// giving new region a id
			const objectId = new ObjectId();
			if(region._id === '') region._id = objectId;

			//root region
			if (_id === region.parentId) {
				region.root = true;
				const found = await Map.findOne({_id: mapId});
				let mapRegions = found.regions
				mapRegions.push(region)
				const updated = await Map.updateOne({_id: mapId}, { regions: mapRegions })
				if(updated) return (region._id);
				else return ('Could not add region');
			} else {
				const found = await Map.findOne({_id: mapId});		// find map
				let numRoot = found.regions.length					// find num regions in map
				for (numRoot; numRoot == 0; i++){
					let root = found.regions[numRoot]
					//let numRegions = root.
					
				}
				
				
				let mapRegions = found.regions
				mapRegions.push(region)
				const updated = await Map.updateOne({_id: mapId}, { regions: mapRegions })
			}

			//if(updated) return (region._id);
			//else return ('Could not add region');
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
		},

		/** 
		 	@param 	 {object} args - a map objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Map.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a map objectID, and the new name
			@returns {boolean} new name on successful update, empty string on failure
		**/
		updateMapField: async (_, args) => {
			const { value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Map.updateOne({_id: objectId}, {name: value});
			if(updated) return value;
			else return "";
		}

	}
}

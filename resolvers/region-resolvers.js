const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
			@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if (!_id) { return ([]) };
			const regions = await Region.find({ owner: _id }).sort({ updatedAt: -1 });;
			if (regions) return (regions);

		},
		/** 
			@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({ _id: objectId });
			if (region) return region;
			else return ({});
		},
		/** 
			@param 	 {object} args - req - the request object containing a user id
			@returns {object} an array of todolist objects on success, and an empty array on failure
		**/
		getAllRootRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if (!_id) { return ([]) };
			const regions = await Region.find({
				$and: [
					{ owner: _id },
					{ root: true }
				]
			});
			if (regions) return (regions);
		},
		/** 
			@param 	 {object} args - a todolist id
			@returns {object} an array of region objects on success, and an empty array on failure
		**/
		getAllAncestors: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			let region = await Region.findOne({ _id: objectId });

			let ancestors = [];
			// return empty array for map
			while (region.root === false) {
				let pId = new ObjectId(region.parentId);
				region = await Region.findOne({ _id: pId });
				ancestors.push(region);
			}
			return ancestors.reverse();
		}

	},
	Mutation: {

		/** 
			@param 	 {object} args - an empty region object
			@returns {object} the new map on success
		**/
		addRegion: async (_, args) => {
			const { region, index } = args;
			let objectId = new ObjectId();
			const { _id, owner, name, capital, leader, landmarks, root, parentId, childrenIds } = region;

			if (_id !== '') objectId = new ObjectId(_id);

			const newRegion = new Region({
				_id: objectId,
				owner: owner,
				name: name,
				capital: capital,
				leader: leader,
				landmarks: landmarks,
				root: root,
				parentId: parentId,
				childrenIds: childrenIds
			});

			if (newRegion.root === false) {
				const pId = new ObjectId(newRegion.parentId);
				const parent = await Region.findOne({ _id: pId });
				let children = parent.childrenIds

				if (index < 0) {
					children.push(newRegion._id);
				} else {
					children.splice(index, 0, newRegion._id);
				}

				const updateParent = await Region.updateOne({ _id: pId }, { childrenIds: children });
			}

			for (let i = 0; i < newRegion.landmarks.length; i++) {
				let currentLand = landmarks[i];
				let found = newRegion;
				while (found.root === false) {
					let pId = new ObjectId(found.parentId);
					found = await Region.findOne({ _id: pId });
					let updatedLandmark = currentLand + " - " + newRegion.name;
					let updatedLandmarkArray = found.landmarks
					updatedLandmarkArray.push(updatedLandmark);
					const updatedParent2 = await Region.updateOne({ _id: pId }, { landmarks: updatedLandmarkArray });
				}
			}




			const updated = await newRegion.save();
			if (updated) {
				return newRegion;
			}
		},

		/** 
			@param 	 {object} args - a region objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			let deleted = await Region.findOne({ _id: objectId });

			if (deleted.root === false) {
				const pId = new ObjectId(deleted.parentId);
				const parent = await Region.findOne({ _id: pId });
				let childs = parent.childrenIds;
				let newChildren = childs.filter(childId => childId !== _id);
				const updateParent = await Region.updateOne({ _id: pId }, { childrenIds: newChildren });
			}

			var childLand = " - " + deleted.name;
			while (deleted.root === false) {
				let pId = new ObjectId(deleted.parentId);
				deleted = await Region.findOne({ _id: pId });

				let parentLands = deleted.landmarks;
				let updatedParentLands = parentLands.filter(function (str) { return !str.includes(childLand); });

				const updatedParent2 = await Region.updateOne({ _id: pId }, { landmarks: updatedParentLands });
			}


			const deletion = await Region.deleteOne({ _id: objectId });

			//const children = await Region.deleteMany({ parentId: objectId });
			if (deletion) return true;
			else return false;

		},
		/** 
			@param 	 {object} args - a map objectID, field and the new value
			@returns {boolean} new name on successful update, empty string on failure
		**/
		updateRegion: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({ _id: objectId }, { [field]: value });

			if (updated) return value;
			else return "";
		},


		updateRegionArray: async (_, args) => {
			const { _id, newArray, field } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({ _id: objectId }, { [field]: newArray });

			if (updated) return true;
			else return false;
		},


		addLandmark: async (_, args) => {
			const { _id, newLandmark, index } = args;
			const objectId = new ObjectId(_id);
			let found = await Region.findOne({ _id: objectId });
			const regionName = found.name;
			let newLandmarks = found.landmarks;

			if (index < 0) {
				newLandmarks.push(newLandmark);
			} else {
				newLandmarks.splice(index, 0, newLandmark);
			}
			const updated = await Region.updateOne({ _id: objectId }, { landmarks: newLandmarks });

			while (found.root === false) {
				let pId = new ObjectId(found.parentId);
				found = await Region.findOne({ _id: pId });
				let updatedLandmark = newLandmark + " - " + regionName;
				let updatedLandmarkArray = found.landmarks
				updatedLandmarkArray.push(updatedLandmark);
				const updatedParent = await Region.updateOne({ _id: pId }, { landmarks: updatedLandmarkArray });
			}


			if (updated) return newLandmark;
			else return '';
		},


		deleteLandmark: async (_, args) => {
			const { _id, landmarkToDelete } = args;
			const objectId = new ObjectId(_id);
			let found = await Region.findOne({ _id: objectId });
			let newLandmarks = found.landmarks.filter(land => land !== landmarkToDelete);
			const regionName = found.name;
			const updated = await Region.updateOne({ _id: objectId }, { landmarks: newLandmarks });

			while (found.root === false) {
				let pId = new ObjectId(found.parentId);
				found = await Region.findOne({ _id: pId });
				let updatedLandmark = landmarkToDelete + " - " + regionName;
				let updatedLandmarkArray = found.landmarks.filter(land => land !== updatedLandmark);
				const updatedParent = await Region.updateOne({ _id: pId }, { landmarks: updatedLandmarkArray });
			}

			if (updated) return landmarkToDelete;
			else return '';
		},

		editLandmark: async (_, args) => {
			const { _id, oldLandmark, newLandmark } = args;
			const objectId = new ObjectId(_id);
			let found = await Region.findOne({ _id: objectId });
			let regionName = found.name;
			let newLandmarks = found.landmarks;

			for (let i = 0; i < newLandmarks.length; i++) {
				if (newLandmarks[i] === oldLandmark) {
					newLandmarks[i] = newLandmark;
				}
			}

			const updated = await Region.updateOne({ _id: objectId }, { landmarks: newLandmarks });


			while (found.root === false) {
				let pId = new ObjectId(found.parentId);
				found = await Region.findOne({ _id: pId });
				let updatedOld = oldLandmark + " - " + regionName;
				let updatedNew = newLandmark + " - " + regionName;

				let parentLandmarks = found.landmarks;

				for (let i = 0; i < parentLandmarks.length; i++) {
					if (parentLandmarks[i] === updatedOld) {
						parentLandmarks[i] = updatedNew;
					}
				}

				const updatedParent = await Region.updateOne({ _id: pId }, { landmarks: parentLandmarks });
			}

			if (updated) return newLandmark;
			else return oldLandmark;
		},


		/*
		changeParent: async (_, args) => {
			const { _id, newParentId } = args;
			const objectId = new ObjectId(_id);
			let found = await Region.findOne({ _id: objectId });


			if (deleted.root === false) {
				const pId = new ObjectId(deleted.parentId);
				const parent = await Region.findOne({ _id: pId });
				let childs = parent.childrenIds;
				let newChildren = childs.filter(childId => childId !== _id);
				const updateParent = await Region.updateOne({ _id: pId }, { childrenIds: newChildren });
			}




		}*/


	}
}


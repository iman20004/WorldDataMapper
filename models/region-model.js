const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		_id: {
			type: ObjectId,
			required: true
		},
		owner: {
			type: String,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
		},
		leader: {
			type: String,
		},
		landmarks: {
			type: [String],
		},
		root: {
			type: Boolean,
			required: true
		},
		parentId: {
			type: String,
		},
		childrenIds: [String]
	},
	{ timestamps: true }
);

const Region = model('Region', regionSchema);
module.exports = Region;
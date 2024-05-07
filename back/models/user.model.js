const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
	{
    username: String,
    role: {
      type: String,
      default: 'user',
    },
    password: String,

	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
const Leave = require("../models/leave.model");

const createLeave = async (req, res) => {

  try {
    const user = req.verifiedUser;
    console.log("check 0 ",user)

    // Check if user has admin role
    if (user.role === 'admin') {
      return res.status(403).send('Admins are not allowed to take leaves!');
    }
    const leave = new Leave({ ...req.body, userId: user });
    const savedLeave = await leave.save();
    return res.status(201).json(savedLeave);
  } catch (error) {

    return res.status(500).json(error.message);
  }
};

const getLeaves = async (req, res) => {
  try {
    const user = req.verifiedUser;
    console.log(user);

    if (user.role === 'admin') {
      const leaves = await Leave.find({});
      return res.status(200).json(leaves);
    } else {
      const userLeaves = await Leave.find({ userId: user._id });
      return res.status(200).json(userLeaves);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getLeaveById = async (req, res) => {
      const user = req.verifiedUser;

  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).send('Leave requested not found!');
    }

    // Only admins and the user himself should be able to view the leave
    if (user.role === 'admin' || user.role === 'user' && user.id.toString() === leave.user.toString()) {
      return res.status(200).json(leave);
    }

    return res.status(403).send('You are not authorized to view this leave!');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateLeave = async (req, res) => {
      const user = req.verifiedUser;

  try {
    // Check if user has admin role
    if (user.role !== 'admin') {
      return res.status(403).send('Only admins are allowed to update leaves!');
    }

    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedLeave) {
      return res.status(404).send('Leave requested not found!');
    }

    return res.status(200).json(updatedLeave);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteLeave = async (req, res) => {
      const user = req.verifiedUser;

  try {
    // Check if user has admin role
    if (user.role !== 'admin') {
      return res.status(403).send('Only admins are allowed to delete leaves!');
    }

    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);

    if (!deletedLeave) {
      return res.status(404).send('Leave requested not found!');
    }

    return res.status(200).json(deletedLeave);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
const getMyLeaves = async (req, res) => {
      const user = req.verifiedUser;

    try {
      const leaves = await Leave.find({ user: user.id });
  
      return res.status(200).json(leaves);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

module.exports = {
  createLeave,
  getLeaves,
  getLeaveById,
  updateLeave,
  deleteLeave,
  getMyLeaves,
};
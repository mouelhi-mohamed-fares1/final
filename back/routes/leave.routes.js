const express = require("express");
const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken.js")

const {
    getLeaves,
    getLeaveById,
    createLeave,
    updateLeave,
    deleteLeave,
    getMyLeaves,
}= require("../controllers/leave.controllers")

router.get("/", verifyToken, getLeaves);
router.post("/", verifyToken,createLeave);
router.get("/:id", verifyToken, getLeaveById);
router.put("/:id", verifyToken, updateLeave);
router.delete("/:id", verifyToken, deleteLeave);
router.get("/myLeaves",verifyToken,getMyLeaves);


module.exports = router;
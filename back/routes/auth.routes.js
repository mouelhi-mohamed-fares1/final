const express = require("express");
const router = require("express").Router();

const {
    logout,
    login,
    register,
 
}= require("../controllers/auth.controllers")

router.get("/logout", logout);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
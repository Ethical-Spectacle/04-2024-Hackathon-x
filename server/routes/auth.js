const {
    login,
    register,
    getAllUsers,
    logOut,
} = require("../controllers/userController");

const router = require("express").Router();

console.log("auth js");

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;

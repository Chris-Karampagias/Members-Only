const router = require("express").Router();
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");

//Home page
router.get("/", messageController.homePage);

//Login page
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

//Sign Up page
router.get("/signup", authController.signUp_get);
router.post("/signup", authController.signUp_post);

//Logout page
router.get("/logout", authController.logout_get);

//Member authentication page
router.get("/memberauth/:id", authController.memberAuth_get);
router.post("/memberauth/:id", authController.memberAuth_post);

//Create message page
router.get("/create-message", messageController.createMessage_get);
router.post("/create-message", messageController.createMessage_post);

//Delete message page
router.get("/delete-message/:id", messageController.deleteMessage_get);
router.post("/delete-message/:id", messageController.deleteMessage_post);

module.exports = router;

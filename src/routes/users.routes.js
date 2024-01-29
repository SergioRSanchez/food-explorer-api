const { Router } = require("express");
const multer = require("multer");

const uploadConfig = require("../configs/upload");
const UserController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_js_1 = require("../controllers/authControllers.js");
const router = express_1.default.Router();
//signup
router.post("/signup", authControllers_js_1.userSignup);
exports.default = router;

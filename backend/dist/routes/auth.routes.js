"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.get('/ping', (req, res) => {
    console.log('PING route hit');
    res.send('pong');
});
router.post('/login', auth_controller_1.login);
router.post('/register', auth_controller_1.register);
exports.default = router;

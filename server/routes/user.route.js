const express = require('express');
const userRouter = express.Router();
const { User } = require('../models');

userRouter.get('/', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

module.exports = userRouter;
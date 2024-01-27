const express = require('express');
const router = express.Router();
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');

router.get("/balance", authMiddleware, async(req, res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

router.get("/",(req, res)=>{
res.send("HEKKKK")
})

module.exports = router;
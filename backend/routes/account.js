const express = require('express');
const mongoose = require('mongoose');
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

router.post("/transfer", authMiddleware, async (req, res) => {
    try {
        const amount = req.body.amount;
        const toAddress = req.body.to;
        const session = await mongoose.startSession();
        session.startTransaction();

        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: toAddress }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: "Invalid account"
            });
        }

        // Perform the transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: toAddress }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        console.error("Error in transfer transaction:", error);
        return res.status(500).json({
            message: "An error occurred during the transfer"
        });
    }
});

module.exports = router;
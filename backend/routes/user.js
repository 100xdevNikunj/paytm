require('dotenv').config()
const express = require('express');
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;
var mongoose = require('mongoose')
const zod = require("zod");
const { User, Account } = require('../db');
const  { authMiddleware } = require("../middleware");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

mongoose.connect(DB_URL);

const router = express.Router();

//  Route to sign up
const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })

        const randomBalance = Math.floor(Math.random() * 10000) + 1;
        const userId = user._id;

    const account = await Account.create({
        userId: userId,
        balance: randomBalance
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        user: user,
        token: token
    })
    }catch(e){
        console.error(e)
    }
})

// Route to sign in

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }
        if(user && passwordMatch){
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token,
            user
        })
        return;
    }
    } catch (error) {
        console.error("Error while logging in:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Route to update user information

const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/",authMiddleware ,async (req, res)=>{
    const { success } = updateBody.safeParse(req.body)

    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.status(200).json({
        message: "Updated successfully"
    })

})

// Route to get users from the backend, filterable via firstName/lastName
router.get('/bulk', async(req, res)=>{
    const simillarFilter = req.query.filter || "";
    try {
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": simillarFilter
                }
            }, {
                lastName: {
                    "$regex": simillarFilter
                }
            }]
        })
        // const users = await User.find({'firstname': {'$regex': simillarFilter}}).or({'lastname': {'$regex': simillarFilter}});
        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
})

module.exports = router;
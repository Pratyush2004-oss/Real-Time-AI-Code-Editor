import asyncHandler from "express-async-handler";
import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import UserModel from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";
/**
 * @login
 * @description login controller used when user send token from the client side
 * @body {token} 
 * */
export const login = asyncHandler(async (req, res, next) => {
    try {
        const { token } = req.body;
        const decoded = await getAuth(app).verifyIdToken(token);

        // check for user with the uid
        let user = await UserModel.findOne({ firebaseUID: decoded.uid });

        if (!user) {
            user = new UserModel({
                firebaseUID: decoded.uid,
                name: decoded.name,
                email: decoded.email,
                avatar: decoded.picture,
            });
            await user.save();
        }

        // generate session id
        const sessionId = crypto.randomUUID();
        await redis.set(`user-session-${user._id}`, sessionId, "EX", 60 * 60 * 24 * 7);

        await redis.set(`session-${sessionId}`, JSON.stringify({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                credits: user.credits
            }
        }), "EX", 60 * 60 * 24 * 7); // 7 days expiry time

        res.cookie("session", sessionId, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 60 * 60 * 24 * 7 * 1000     // 7 days
        });

        // send response
        res.status(200).json({
            user, message: "User logged in successfully"
        });
    } catch (error) {
        console.log(`Error in Login controller: ${error}`);
        next(error);
    }
});

/**
 * @logout
 * @description logout controller used when user send token from the client side
 */
export const logout = asyncHandler(async (req, res, next) => {
    try {
        // access session id
        const sessionId = req.cookies?.session;
        // clear redis cache
        await redis.del(`session-${sessionId}`);
        // clear cookie
        res.clearCookie("session");
        res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.log(`Error in Logout controller: ${error}`);
        next(error);
    }
});

/**
 * @deductCredits
 * @description deduct credits from user
 * @body {userId, amount}
 */
export const deductCredits = asyncHandler(async (req, res, next) => {
    try {
        const { userId, amount } = req.body;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized, user Id not found."
            });
        }
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found."
            });
        }
        if (user.credits < amount) {
            return res.status(400).json({
                message: "Insufficient credits."
            });
        }
        user.credits -= amount;
        await user.save();
        const sessionId = await redis.get(`user-session-${userId}`);
        await redis.set(`session-${sessionId}`, JSON.stringify({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                credits: user.credits
            }
        }), "EX", 60 * 60 * 24 * 7);
        res.status(200).json({
            message: "Credits deducted successfully.",
            credits: user.credits
        });
    } catch (error) {
        console.log(`Error in deductCredits controller: ${error}`);
        next(error);
    }
})

/**
 * @addCredits
 * @description add credits to user
 * @body {userId, amount}
*/
export const addCredits = asyncHandler(async (req, res, next) => {
    try {
        const { userId, amount } = req.body;
        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized, user Id not found."
            });
        }
        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({
                message: "User not found."
            });
        }
        user.credits += amount;
        await user.save();
        const sessionId = await redis.get(`user-session-${userId}`);
        await redis.set(`session-${sessionId}`, JSON.stringify({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                credits: user.credits
            }
        }), "EX", 60 * 60 * 24 * 7);
        res.status(200).json({
            message: "Credits added successfully.",
            credits: user.credits
        });
    } catch (error) {
        console.log(`Error in addCredits controller: ${error}`);
        next(error);
    }
})
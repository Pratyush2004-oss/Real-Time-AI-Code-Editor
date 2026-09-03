import asyncHandler from "express-async-handler";

export const getCurrentUser = asyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error in getCurrentUser controller: ${error}`);
        next(error);
    }
})
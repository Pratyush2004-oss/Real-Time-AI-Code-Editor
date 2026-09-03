import redis from "../../shared/redis/redis.js";

export const isAuth = async (req, res, next) => {
    try {
        const sessionId = req.cookies?.session;
        // check for session id
        if (!sessionId) {
            return res.status(401).json({
                success: false, message: "Unauthorized, session Id not found."
            });
        }
        // check for session in redis
        const result = await redis.get(`session-${sessionId}`);
        if (!result) {
            return res.status(401).json({
                success: false, message: "Unauthorized, session not found."
            });
        }
        if (typeof result === 'string') {
            const data = JSON.parse(result);
            req.user = data.user;
            next();
        }
    } catch (error) {
        console.log(`Error in protect middleware: ${error}`);
        next(error);
    }
}
import expressAsyncHandler from "express-async-handler";
import { graph } from "../graph/graph.js";
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const buildHistory = (history) => {
    if (!Array.isArray(history)) {
        return [];
    }
    const recents = history.slice(-6);
    return recents.filter((recent) => recent?.content && (recent.role == "user" || recent.role == "assistant"))
        .map((msg) => {
            if (msg.role == "user") {
                return new HumanMessage(msg.content);
            }
            return new AIMessage(msg.content);
        })
}

export const chat = expressAsyncHandler(async (req, res, next) => {
    try {
        const userId = req.headers["x-user_id"];

        if (!userId) {
            return res.status(401).json({
                message: "Unauthorized, user Id not found."
            });
        }

        const { projectId, message, history = [] } = req.body;

        if (!projectId || !message) {
            return res.status(400).json({
                message: "Please provide projectId and message."
            });
        }

        const graphData = graph({ projectId, userId });
        const messages = buildHistory(history);
        messages.push(new HumanMessage(message.trim()));

    } catch (error) {
        console.log(`Error in chat controller: ${error}`);
        next(error);
    }
})
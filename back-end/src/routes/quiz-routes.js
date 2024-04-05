import { getAllQuestions, createQuiz, getAllQuiz, getMyQuestions } from "../controllers/quiz-controller.js"
import { deleteQuiz } from "../controllers/quiz-controller.js";
import express from "express";
import { verifyToken } from "../middleware/auth.js";
export const quizRouter = express.Router();
quizRouter.get("/questions", verifyToken, getAllQuestions)
quizRouter.get("/questionss", verifyToken, getAllQuiz)
quizRouter.get("/myQuiz", verifyToken, getMyQuestions)
quizRouter.post("/question", verifyToken, createQuiz)
quizRouter.delete('/deleteQuiz/:QuizId', verifyToken, deleteQuiz)




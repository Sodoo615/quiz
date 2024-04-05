import { Question } from "../models/question.js"

export const getAllQuestions = async (req, res) => {
    try {
        // const { questionSection } = req.query;
        // const query = questionSection ? { questionSection } : {};
        // console.log(query)
        const questions = await Question.find();
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error in getAllQuestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const createQuiz = async (req, res) => {
    try {
        const { body, createrId } = req.body;
        const newQuiz = body
        const quiz = await Question.create({ questions: newQuiz, userId: req.user.user_id, Quizid: newQuiz._id });
        if (quiz) {
            res.status(200).json({ data: quiz, message: "success" });
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
}
// getAllQuizs
export const getAllQuiz = async (req, res) => {
    try {
        const { _id } = req.query;
        const query = _id ? { _id } : {};
        const questions = await Question.find(query);
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error in getAllQuiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getMyQuestions = async (req, res) => {
    try {
        const userId = req.user?.user_id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID not available' });
        }
        const distinctQuizIds = await Question.distinct('QuizId', { userId });
        const userCreatedQuestions = await Promise.all(
            distinctQuizIds.map(async (quizId) => {
                return await Question.findOne({ userId, QuizId: quizId });
            })
        );
        res.status(200).json({
            userCreatedQuestions,
        });
    } catch (error) {
        console.error('Error in getQuestions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const deleteQuiz = async (req, res) => {
    const quizId = req.params.QuizId;

    try {
        const quizExists = await Question.findOne({ QuizId: quizId });

        if (!quizExists) {
            return res.status(404).json({ success: false, message: 'Quiz not found' });
        }

        const result = await Question.deleteOne({ QuizId: quizId });

        console.log('Delete result:', result);

        if (result.deletedCount > 0) {
            res.json({ success: true, message: 'Quiz delete success' });
        } else {
            res.status(404).json({ success: false, message: 'No quizzes found or unable to delete' });
        }
    } catch (error) {
        console.error('Error deleting quizzes:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
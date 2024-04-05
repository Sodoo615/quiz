import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    questions: [
        {
            questionImg: { type: String, },
            questionSection: { type: String, required: true },
            questionText: { type: String, required: true },
            quesImg: { type: String, },
            answerOptions: [
                {
                    answerText: { type: String, required: true },
                    isCorrect: { type: Boolean, required: true }
                }
            ]
        }
    ],

    userId: { type: mongoose.Schema.Types.ObjectId },
    QuizId: {
        type: String,
        unique: true,
        default: () => Math.floor(10000 + Math.random() * 90000).toString(),
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,

    }

});
export const Question = mongoose.model("Question", quizSchema);

import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({

    quizTitle: String,
    quizImage: String

});

const Quiz = mongoose.model('quiz', quizSchema);

export default Quiz;
'use client'

import style from './create.css';
import React, { useState } from 'react';
import CreatedQuizs from '../createdQuizs/page.js'
import Link from "next/link"
import axios from 'axios';

const AddQuestionForm = () => {

    const [image, setImage] = useState("");
    const [section, setSection] = useState("");
    const [questions, setQuestions] = useState([
        {
            questionText: "",
            quesImg: "",
            answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: true },
            ],
        },
        {
            questionText: "",
            quesImg: "",
            answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: true },
            ],
        },
        {
            questionText: "",
            quesImg: "",
            answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: true },
            ],
        },
        {
            questionText: "",
            quesImg: "",
            answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: true },
            ],
        },
        {
            questionText: "",
            quesImg: "",
            answerOptions: [
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: false },
                { answerText: "", isCorrect: true },
            ],
        },
    ]);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const questionsWithCommonInfo = questions.map((question) => ({
                ...question,
                questionImg: image,
                questionSection: section,
            }));
            const token = localStorage.getItem("token");
            await axios.post(`https://back-end-gamma-lac.vercel.app/question`, { token: token, body: questionsWithCommonInfo });
            setSuccess(true);
        } catch (error) {
            console.error('Error adding questions:', error);
        }
    };

    return (
        <div className='containerss' style={{ color: "white" }}>

            <div className='bk'>
                <Link href="/">
                    <button>back</button>
                </Link>
            </div>
            {!success ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        <h3>Image</h3>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>

                    <label>
                        <h3>Section</h3>
                        <input
                            type="text"
                            value={section}
                            onChange={(e) => setSection(e.target.value)}
                        />
                    </label>

                    {questions.map((question, questionIndex) => (
                        <div className="containerss" key={questionIndex}>
                            <label>
                                <h3>Question Text</h3>
                                <input
                                    type="text"
                                    value={question.questionText}
                                    onChange={(e) =>
                                        setQuestions((prevQuestions) =>
                                            prevQuestions.map((prevQuestion, index) =>
                                                index === questionIndex
                                                    ? { ...prevQuestion, questionText: e.target.value }
                                                    : prevQuestion
                                            )
                                        )
                                    }
                                />
                            </label>
                            <label>
                                <h3>Question Image</h3>
                                <input
                                    type="text"
                                    value={question.quesImg}
                                    onChange={(e) =>
                                        setQuestions((prevQuestions) =>
                                            prevQuestions.map((prevQuestion, index) =>
                                                index === questionIndex
                                                    ? { ...prevQuestion, quesImg: e.target.value }
                                                    : prevQuestion
                                            )
                                        )
                                    }
                                />
                            </label>

                            {question.answerOptions.map((option, optionIndex) => (
                                <div key={optionIndex}>
                                    <label>
                                        <h3>Answer Text</h3>
                                        <input
                                            type="text"
                                            value={option.answerText}
                                            onChange={(e) =>
                                                setQuestions((prevQuestions) =>
                                                    prevQuestions.map((prevQuestion, qIndex) =>
                                                        qIndex === questionIndex
                                                            ? {
                                                                ...prevQuestion,
                                                                answerOptions: prevQuestion.answerOptions.map(
                                                                    (prevOption, oIndex) =>
                                                                        oIndex === optionIndex
                                                                            ? { ...prevOption, answerText: e.target.value }
                                                                            : prevOption
                                                                ),
                                                            }
                                                            : prevQuestion
                                                    )
                                                )
                                            }
                                        />
                                    </label>

                                    <label style={{ paddingLeft: '20px' }}>
                                        Is Correct:
                                        <input
                                            type="checkbox"
                                            checked={option.isCorrect}
                                            onChange={(e) =>
                                                setQuestions((prevQuestions) =>
                                                    prevQuestions.map((prevQuestion, qIndex) =>
                                                        qIndex === questionIndex
                                                            ? {
                                                                ...prevQuestion,
                                                                answerOptions: prevQuestion.answerOptions.map(
                                                                    (prevOption, oIndex) =>
                                                                        oIndex === optionIndex
                                                                            ? { ...prevOption, isCorrect: e.target.checked }
                                                                            : prevOption
                                                                ),
                                                            }
                                                            : prevQuestion
                                                    )
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className='wwe'>
                        <button className="buttonSubmit" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div>
                    <CreatedQuizs></CreatedQuizs>
                </div>
            )}
        </div>
    );
};

export default AddQuestionForm;
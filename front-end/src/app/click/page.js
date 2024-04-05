"use client"
import { useEffect, useState } from "react";
import style from "../style.css";
import axios from "axios"
import { useRouter, useSearchParams } from "next/navigation";

export default function Quiz({ searchParams }) {
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(20);
    const [backgroundColor, setBackgroundColor] = useState('');

    const { _id } = searchParams
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://back-end-gamma-lac.vercel.app/questionss?_id=${_id}`, { headers: { 'x-access-token': token }, });
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let interval;
        if (!showScore) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [showScore]);
    useEffect(() => {
        if (timer === 0) {
            handleAnswerClick(false);
        }
    }, [timer]);

    const handleAnswerClick = (isCorrect) => {

        // clearInterval(timer);
        if (isCorrect === true) {
            setScore(score + 1);
            setBackgroundColor('green');
        } else {
            setBackgroundColor('red');
        }


        setTimeout(() => {
            setBackgroundColor('white');
        }, 500);


        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions[0].questions.length) {
                setCurrentQuestion(nextQuestion);
                setTimer(20);
                setBackgroundColor('');
            } else {
                setShowScore(true);
            }
        }, 1000);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(20);
        setBackgroundColor('');
    };
    // console.log(questions[0]?.questions[0]?.questionSection)
    // console.log(questions[0]?.questions[currentQuestion])
    return (
        <div >
            {showScore ? (
                <div className="hariu">
                    <h2>Your Score: {score} out of {questions[0].questions.length}</h2>
                    <button onClick={restartQuiz}>Restart Quiz</button>
                </div>
            ) : (
                <div className="ques">
                    <img className="member" src={questions[0]?.questions[currentQuestion]?.quesImg} />
                    <div className="answr">
                        <p>  {questions[0]?.questions[currentQuestion]?.questionText}<br />
                            Time left: {timer} seconds</p>
                        <ul>
                            {questions[0]?.questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                                <li key={index}>
                                    <button className="correctButton" style={{ backgroundColor, }} onClick={() => handleAnswerClick(answerOption.isCorrect)}>
                                        {answerOption.answerText}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>

    )
}

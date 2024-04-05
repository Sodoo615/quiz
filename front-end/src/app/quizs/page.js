"use client"
import { useState, useEffect } from "react";
import { useRouter, } from "next/navigation";
import axios from "axios";
import style from "./myQuiz.css"
export default function MyQuiz() {
    const [userCreatedQuestions, setUserCreatedQuestions] = useState([])
    const [questions, setQuestions] = useState([])
    const [questionSection, setUserId] = useState('');
    const [loading, setloading] = useState([false]);
    const [error, setError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            setloading(true)
            try {
                const response = await axios.get(`https://back-end-gamma-lac.vercel.app/questions`, { headers: { 'x-access-token': token }, });
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Error!!!")
            } finally {
                setloading(false)
            }
        };
        fetchData();
    }, []);

    const router = useRouter()
    const handleCreate = (_id) => {
        router.push(`/click?_id=${_id}`)
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            setloading(true)
            try {
                const response = await axios.get(`https://back-end-gamma-lac.vercel.app/myQuiz`, { headers: { 'x-access-token': token }, });
                setUserCreatedQuestions(response.data.userCreatedQuestions);
            } catch (error) {
                console.error('Error fetching data:', error)
                setError("required login! ")
            } finally {
                setloading(false)
            }
        };
        fetchData();
    }, []);
    const handleDelete = async (QuizId) => {
        const token = localStorage.getItem("token");
        if (QuizId !== null) {

            try {
                const response = await axios.delete(`https://back-end-gamma-lac.vercel.app/deleteQuiz/${QuizId}`, { headers: { 'x-access-token': token }, },
                )
                if (response.data.success) {
                    router.push("/")
                    setDeleteSuccess(true);
                } else {
                    console.error(response.data.message);
                }
                const data = response.data;
                setDeleteSuccess(data)
                if (data.success) {
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error deleting user:', error);

            }
        };
    }
    return (
        <div >

            <h4 >My quiz :</h4>
            {loading &&
                <div className="lds">
                    <div className="loader">

                    </div>
                    <p style={{ color: "white" }}>loading...</p>
                </div>
            }
            {error && <p style={{ color: "white", textAlign: "center", fontFamily: "fantasy" }} >{error}</p>}
            <div className="createquizs">
                {userCreatedQuestions.map((item) => {
                    return (
                        <div key={item._id} className="men" >
                            <div className="imgs">
                                <div className="dlete">
                                    <button onClick={() => handleDelete(item?.QuizId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-x" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M4 7h16" />
                                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                            <path d="M10 12l4 4m0 -4l-4 4" />
                                        </svg>
                                    </button>

                                </div>
                                <img className="men" src={item?.questions[0]?.questionImg} style={{ color: "white", textAlign: "center" }} alt='question img ' />

                                <p className="section" >{item?.questions[0]?.questionSection}</p>
                            </div>
                            <div className="playButton">
                                <button className="plyButtons" onClick={() => handleCreate(item?._id)}>Play now</button>
                            </div>

                        </div>
                    )
                })}
            </div>
        </div>
    )
}
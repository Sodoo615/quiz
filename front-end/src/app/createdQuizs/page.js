'use client'
import { useRouter, } from "next/navigation";
import { useEffect, useState, } from "react"
import Link from "next/link"
import style from "./created.css"
import axios from "axios"

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const [loading, setloading] = useState([false]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('')
    const [deleteSuccess, setDeleteSuccess] = useState(false)
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            setloading(true)
            try {
                const response = await axios.get(`https://back-end-gamma-lac.vercel.app/questions`, { headers: { 'x-access-token': token }, });
                setQuestions(response.data.questions);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("required login!")
            } finally {
                setloading(false)
            }
        };
        fetchData();
    }, []);

    const routers = useRouter()
    const handleCreate = (_id) => {
        routers.push(`/click?_id=${_id}`)
    }

    return (
        <div className="gre">
            {loading &&
                <div className="lds">
                    <div className="loader">

                    </div>
                    <p style={{ color: "white" }}>loading...</p>
                </div>
            }
            {error && <p style={{ color: "white", textAlign: "center" }} >{error}</p>}
            <div className="bak">
                <Link href="/">
                    <button className="back" >Back</button>
                </Link>
            </div>
            <div className="search">
                <input onChange={(e) => setSearch(e.target.value)} type="search" placeholder="search" />
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="40px" height="40px" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                </svg>
            </div>

            <div className="crequizs">
                {questions.filter((item) =>
                    item.questions[0]?.questionSection.toUpperCase() === '' ? item : item.questions[0]?.questionSection.toLowerCase().includes(search)
                ).map((item) => {
                    return (
                        <div key={item._id} className="mans" >
                            <div className="images">
                                <img className="mans" src={item?.questions[0]?.questionImg} style={{ color: "white", textAlign: "center" }} alt='question img ' />
                                <p className="title" >{item?.questions[0]?.questionSection}</p>
                            </div>
                            <div className="plyButton">
                                <button className="plyButton" onClick={() => handleCreate(item?._id)}>Play now</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

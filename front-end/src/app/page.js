'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import Link from "next/link"
import style from "./style.css"
import MyQuiz from './quizs/page.js'

export default function Home() {
  const [open, setOpen] = useState("")
  const [questions, setQuestions] = useState([]);
  const [item, setItem] = useState()
  const [name, setUserId] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const Shalgah = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("error tokeFound");
        router.push('/login');
      } else {
        console.log("token : ", token)
      }
    }
    Shalgah();
  }, [router]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`https://back-end-gamma-lac.vercel.app/user/`, { headers: { "x-access-token": token } })
      .then((response) => response.json())
      .then((res) => setItem(res.user))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://back-end-gamma-lac.vercel.app/delete/${name}`,
        { headers: { 'x-access-token': token }, })

      if (response.data.success) {
        router.push("/signup")
        setDeleteSuccess(true);
      } else {

        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);

    }
  };

  const logoutlogin = () => {
    try {
      localStorage.removeItem("token");
      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   if (window) {
  //     const uid = localStorage.getItem("uid");

  //     if (uid === null) {
  //       router.push('login')
  //     }

  //   }
  // }, []);
  // context

  const handleClickCreatedQuiz = () => {
    router.push("/createdQuizs")
  }
  const handleClickCreate = () => {
    router.push("CreateQuiz")
  }
  const handleClickMyquiz = () => {
    router.push("/quizs")
  }
  console.log(questions)
  return (
    <div>
      <div className="etseg-quiz">
        <div className="profile" >
          <img className="avatars" onClick={() => setOpen(!open)} src="avataaarsss (1).svg" />
          {open && (
            <MenuItem item={item} logoutlogin={logoutlogin} setUserId={setUserId} handleDelete={handleDelete} />
          )}
        </div>
        <div className="quiz">
          <p>Quiz</p>
          <div className="creates">
            <button onClick={() => handleClickCreate()} className="button-85">Create Quiz</button>
            <button onClick={() => handleClickCreatedQuiz()} className="button-85">Created Public Quizs</button>
          </div>

        </div>
      </div>
      <div className="myQuiz">
        <MyQuiz></MyQuiz>
      </div>
    </div>
  )
}


const MenuItem = ({ item, logoutlogin, setUserId, handleDelete }) => {
  return (
    <div className="menu-wrap">
      <div className="menu" >
        <div>
          <div>
            <ul>
              <li>name:{item?.name}</li>
              <li>email:{item?.email}</li>
              <div className="btns">
                <button onClick={logoutlogin} className="deleteLog" >
                  Logout
                </button>
              </div>
              <h1>name: </h1>
              <input placeholder="to delete your account enter your name 😡!" type="text" onChange={(e) => setUserId(e.target.value)} />
              <button onClick={handleDelete}>Delete My Account</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
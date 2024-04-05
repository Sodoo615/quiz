"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link"
import style from "./stylee.css"

export default function Home() {
    const [signData, setSignData] = useState({});
    const [showPass, setShowPass] = useState()
    const pressShow = (e) => {
        e.preventDefault();
        setShowPass(!showPass)
    }
    const router = useRouter();

    const handleSignup = async () => {
        const { data } = await axios.post(`https://back-end-gamma-lac.vercel.app/user`, {
            name: signData.name,
            email: signData.email,
            password: signData.password
        });
        if (data?.user) {
            localStorage.setItem("uid", data.user.id);

        }
    }
    return (
        <div className="container" >
            <div className="signup">

                <h3 className="sign">Sign Up</h3>
                <input
                    className="signinput"
                    placeholder="name"
                    onChange={(e) => setSignData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                    className="signinput"
                    placeholder="email"
                    onChange={(e) => setSignData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <p onClick={e => pressShow(e)} className="show">{showPass ? "hide" : "show"}</p>
                <input
                    className="signinput"
                    type={showPass ? "text" : "password"}
                    placeholder="password"
                    onChange={(e) => setSignData((prev) => ({ ...prev, password: e.target.value }))}
                />
                <Link href="login">
                    <button className="button" onClick={handleSignup}>Sign Up</button>
                </Link>

            </div>

        </div>

    )
}
'use client';

import axios from "axios"
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./styles.css"

export default function Home() {
    const [loginData, setLoginData] = useState({});
    const router = useRouter();
    const routers = useRouter();
    const handleLogin = async () => {
        const { data } = await axios.post(`https://back-end-gamma-lac.vercel.app/login`, {
            name: loginData.name,
            email: loginData.email,
            password: loginData.password
        });
        if (data?.token) {
            localStorage.setItem("token", data.token);
            router.push('/');
        }
    }
    const Click = () => {
        routers.push("signup")
    }
    return (
        <div className="containers">
            <div className="login">
                <h3 className="logs">Login</h3>
                <input
                    className="inpt"
                    placeholder="name"
                    onChange={(e) => setLoginData((prev) => ({ ...prev, name: e.target.value }))}
                />
                <input
                    className="inpt"
                    placeholder="email"
                    onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                />
                <input
                    className="inpt"
                    placeholder="password"
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                />
                <p className="signJump" onClick={() => Click()} >Signup</p>
                <button className="butnn" onClick={handleLogin}>login</button>
            </div>
        </div>

    )
}

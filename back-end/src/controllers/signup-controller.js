'use client'
import { users } from "./user-controller.js";

export const signup = (req, res) => {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        res.status(403).json({ message: "Name, email, and password are required" });
        return;
    }
    const existingUser = users.find((user) => user.email === body.email);
    if (existingUser) {
        res.status(405).json({ message: "Email already in use" });
        return;
    }
    const newUser = {
        id: new Date().getTime().toString(),
        name: body.name,
        password: body.password,
        email: body.email,
    };
    users.push(newUser);
    res.status(200).json({ user: newUser });
};
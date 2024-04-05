import { request } from "express";
import { UserModel } from "../models/user-model.js";
import bcrypt from "bcrypt"
export const users = [
    {
        "id": "sanoifhjsapomfp868",
        "name": "bob",
        "email": "email@gmail.com",
        "password": "pass"
    }
];

export const getAllUsers = async (req, res) => {
    const users_data = await UserModel.find({});
    res.status(200).json({ users: users_data })
}

export const getUser = async (req, res) => {
    // const params = req.params;
    const user = req.user
    // const filteredUser = users.filter((cur) => cur.id === params.id);
    const oneUser = await UserModel.findById(user.user_id)

    if (!oneUser) {
        res.status(405).json({ message: "User not found" });
    } else {
        res.status(200).json({ user: oneUser });
    }
};

export const createUser = async (req, res) => {
    const body = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    await UserModel.create({
        name: body.name,
        password: hashedPassword,
        email: body.email,
        createdOn: new Date(),
    });
    // users.push(newUser);
    res.status(200).json({ users: "success" });
};

export const login = async (req, res) => {
    // password, email
    const body = req.body;

    if (body.email === undefined) {
        res.status(403).json({ message: "Email required" })
        return;
    }
    if (body.password === undefined) {
        res.status(403).json({ message: "Password required" })
        return;
    }

    const filteredUser = users.filter((cur) => cur.email === body.email);

    try {
        const user = await UserModel.findOne({ email: body.email });
        if (!user) {
            res.status(405).json({ message: "User not found" });
            return;
        }
        if (user.password === body.password) {
            res.status(200).json({ user });
        } else {
            res.status(405).json({ message: "Password not match" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


}
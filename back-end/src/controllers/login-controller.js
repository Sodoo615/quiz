import { users } from "./user-controller.js";
import { UserModel } from "../models/user-model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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
        if (await bcrypt.compare(body.password, user.password)) {
            const token = jwt.sign(
                { user_id: user._id, email: user.email },
                "MeAndBrother",
                {
                    expiresIn: "2h"
                }
            )
            res.status(200).json({ token });
        } else {
            res.status(405).json({ message: "Password not match" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
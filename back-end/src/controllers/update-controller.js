
import { UserModel } from '../models/user-model.js';

async function updateUser(req, res) {
    const userId = req.params.id;
    const { newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export { updateUser };
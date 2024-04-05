import { UserModel } from '../models/user-model.js';

const deleteUser = async (req, res) => {
    const userName = req.params.name;

    try {
        const result = await UserModel.deleteOne({ name: userName });

        if (result.deletedCount === 1) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'User not found or unable to delete' });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export { deleteUser };
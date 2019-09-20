const { User } = require('../models');

class UserController {
    async getUser(req, res) {
        const users = await User.findAll();

        const users_to_response = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email
            };
        });

        return res.status(200).json({
            success: true,
            message: 'List of users.',
            data: users_to_response
        });
    }


    async getUserById(req, res) {
        const user_id = parseInt(req.params.id);

        if (isNaN(user_id)) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a valid user id on route param.'
            });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        const user_to_response = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.status(200).json({
            success: true,
            data: user_to_response
        });
    }


    async createNewUser(req, res) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a name, email and password as a json on requisition body.'
            });
        }

        const user = await User.create({ name, email, password });

        const user_to_response = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.status(201).json({
            success: true,
            message: 'User informed was created.',
            data: user_to_response
        });
    }


    async updateUser(req, res) {
        const user_id = parseInt(req.params.id);

        if (isNaN(user_id)) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a user id on route param.'
            });
        }

        const data = req.body;

        if (!data.name && !data.email && !data.password) {
            return res.status(400).json({
                success: false,
                message: 'You must provide at least one of these parameters on body: name, email or password.'
            });
        }

        if (data.email && data.email.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Email can not be blank'
            });
        }

        if (!data.password && data.password === '') {
            return res.status(400).json({
                success: false,
                message: 'Password can not be blank'
            });
        }

        const data_to_be_updated = {};

        if (data.name) data_to_be_updated.name = data.name;

        if (data.email) data_to_be_updated.email = data.email;

        if (data.password) data_to_be_updated.password = data.password;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        await user.update(data_to_be_updated);

        const return_user = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return res.status(200).json({
            success: true,
            message: 'User updated.',
            data: return_user
        });
    }

    async deleteUser(req, res) {
        const user_id = parseInt(req.params.id);

        if (isNaN(user_id)) {
            return res.status(400).json({
                success: false,
                message: 'You must provide a user id on route param.'
            });
        }

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        if (req.userId === user.id) {
            return res.status(400).json({
                success: false,
                message: 'You can not delete yourself.'
            });
        }

        await user.destroy();

        res.status(200).json({ user });
    }
}

module.exports = new UserController();
const { User } = require('../models');

class SessionController {
    async store(req, res) {

        const data = req.body;

        if (!data.email || !data.password) {
            return res.status(400).json({
                success: false,
                message: 'You must provide email and password on body request.'
            });
        }

        const { email, password } = data;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const password_is_valid = await user.checkPassword(password);

        if (!password_is_valid) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password'
            });
        }

        const user_to_response = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return res.status(200).json({
            success: true,
            token: user.generateToken(),
            user: user_to_response
        });
    }
}

module.exports = new SessionController();
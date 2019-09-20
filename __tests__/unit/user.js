const bcrypt = require('bcryptjs');
const factory = require('../factories');
const truncate = require('../utils/truncate');


module.exports = testSuiteUserUnit = () => describe('User Unit', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('should register a new user', async () => {
        const user = await factory.create('User', {
            password: '123456'
        });

        const compareHash = await bcrypt.compare('123456', user.password_hash);

        expect(compareHash).toBe(true);
    });
});
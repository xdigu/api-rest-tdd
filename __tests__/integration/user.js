const request = require('supertest');
const app = require('../../src/app.js');
const factory = require('../factories');
const truncate = require('../utils/truncate');


module.exports = testSuiteUserIntegration = () => describe('Route user', () => {
    beforeEach(async () => {
        await truncate();
    });

    describe('GET', () => {
        it('should list all users', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .get('/user')
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });

        it('should return a user by passing user ID', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .get(`/user/${user.id}`)
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });

        it('should not return a user by passing a invalid user ID', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .get(`/user/${0}`)
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(404);
        });

        it('should not return a user by passing a invalid user ID', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .get(`/user/a`)
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(400);
        });

        it('should not access a single use without jwt token', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .get(`/user/${user.id}`);

            expect(response.status).toBe(401);
        });

        it('should not access all users without jwt token', async () => {
            const response = await request(app)
                .get(`/user`);

            expect(response.status).toBe(401);
        });
    });

    describe('POST', () => {
        it('should create a new user', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/user')
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs',
                    email: 'steve.jobs@apple.com',
                    password: 'loveApple'
                });

            expect(response.status).toBe(201);
        });

        it('should not create a new user without name param', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/user')
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    email: 'steve.jobs@apple.com',
                    password: 'loveApple'
                });

            expect(response.status).toBe(400);
        });

        it('should not create a new user without email params', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/user')
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs',
                    password: 'loveApple'
                });

            expect(response.status).toBe(400);
        });
        it('should not create a new user without password params', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/user')
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs',
                    email: 'steve.jobs@apple.com'
                });

            expect(response.status).toBe(400);
        });

        it('should not access this route without jwt token', async () => {
            const response = await request(app)
                .post(`/user`);

            expect(response.status).toBe(401);
        });
    });

    describe('PUT', () => {
        it('should update a user', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${user.id}`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs',
                    email: 'stevejobs@apple.com',
                    password: 'newPassword'
                });

            const user_data = response.body.data;

            expect(response.status).toBe(200);
            expect(user_data.name).toBe('Steve Jobs');
        });

        it('should not update a user without user id param', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs'
                });

            expect(response.status).toBe(404);
        });

        it('should not update a user with blank email', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${user.id}`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    email: ' '
                });

            expect(response.status).toBe(400);
        });

        it('should not update a user with blank password', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${user.id}`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    email: 'new@email.com',
                    password: ''
                });

            expect(response.status).toBe(400);
        });

        it('should not update a user sending a invalid id param', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/a`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs'
                });

            expect(response.status).toBe(400);
        });

        it('should not update a user when do not send data to update', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${user.id}`)
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(400);
        });

        it('should not update a invalid user', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${0}`)
                .set('Authorization', `bearer: ${user.generateToken()}`)
                .send({
                    name: 'Steve Jobs'
                });

            expect(response.status).toBe(404);
        });

        it('should not access this route without jwt token', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .put(`/user/${user.id}`);

            expect(response.status).toBe(401);
        });
    });

    describe('DELETE', () => {
        it('should delete a user', async () => {
            const user = await factory.create('User');
            const user_to_delete = await factory.create('User');

            const delete_response = await request(app)
                .delete(`/user/${user_to_delete.id}`)
                .set('Authorization', `bearer ${user.generateToken()}`);

            const get_user_response = await request(app)
                .get(`/user/${user_to_delete.id}`)
                .set('Authorization', `bearer ${user.generateToken()}`);

            expect(delete_response.status).toBe(200);
            expect(get_user_response.status).toBe(404);
        });

        it('should not delete him self', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .delete(`/user/${user.id}`)
                .set('Authorization', `bearer ${user.generateToken()}`);

            expect(response.status).toBe(400);
        });

        it('should not delete a invalid user', async () => {
            user = await factory.create('User');

            const response = await request(app)
                .delete('/user/0')
                .set('Authorization', `bearer ${user.generateToken()}`);

            expect(response.status).toBe(404);
        });

        it('should not delete a user sending a invalid id', async () => {
            user = await factory.create('User');

            const response = await request(app)
                .delete('/user/a')
                .set('Authorization', `bearer ${user.generateToken()}`);

            expect(response.status).toBe(400);
        });

        it('should not access this route without jwt token', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .delete(`/user/${user.id}`);

            expect(response.status).toBe(401);
        });
    });
});

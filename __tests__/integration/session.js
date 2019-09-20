const request = require('supertest');
const app = require('../../src/app.js');
const factory = require('../factories');
const truncate = require('../utils/truncate');

module.exports = testSuiteSession = () => describe('Route auth', () => {
    beforeEach(async () => {
        await truncate();
    });

    describe('GET', () => {
        it('should not access GET route', async () => {
            const response = await request(app)
                .get('/session');

            expect(response.status).toBe(404);
        });
    });

    describe('POST', () => {
        it('should auth with valid credentials', async () => {
            const user = await factory.create('User', {
                password: '1234'
            });

            const response = await request(app)
                .post('/session')
                .send({
                    email: user.email,
                    password: '1234'
                });

            expect(response.status).toBe(200);
        });

        it('should not auth when do not send email', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/session')
                .send({
                    password: user.password
                });

            expect(response.status).toBe(400);
        });

        it('should not auth when do not send password', async () => {
            const user = await factory.create('User');

            const response = await request(app)
                .post('/session')
                .send({
                    password: user.email
                });

            expect(response.status).toBe(400);
        });

        it('should not auth with invalid credentials', async () => {
            const user = await factory.create('User', {
                password: '1234'
            });

            const response = await request(app)
                .post('/session')
                .send({
                    email: user.email,
                    password: '123'
                });

            expect(response.status).toBe(401);
        });

        it('should return invalid user', async () => {
            const response = await request(app)
                .post('/session')
                .send({
                    email: 'any@any.com',
                    password: '123'
                });

            expect(response.status).toBe(404);
        });

        it('should return a jwt token when authenticated', async () => {
            const user = await factory.create('User', {
                password: '1234'
            });

            const response = await request(app)
                .post('/session')
                .send({
                    email: user.email,
                    password: '1234'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        });

        it('should be able to access private routes when authenticated', async () => {
            const user = await factory.create('User', {
                password: '1234'
            });

            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `bearer: ${user.generateToken()}`);

            expect(response.status).toBe(200);
        });

        it('should not be able to access private routes withoue jwt token', async () => {
            const response = await request(app)
                .get('/dashboard');

            expect(response.status).toBe(401);
        });

        it('should not be able to access private routes with invalid token', async () => {
            const response = await request(app)
                .get('/dashboard')
                .set('Authorization', `bearer: 1234`);

            expect(response.status).toBe(401);
        });
    });

    describe('PUT', () => {
        it('should not access PUT route', async () => {
            const response = await request(app)
                .put('/session');

            expect(response.status).toBe(404);
        });
    });

    describe('DELETE', () => {
        it('should not access DELETE route', async () => {
            const response = await request(app)
                .delete('/session');

            expect(response.status).toBe(404);
        });
    });

});
const app = require('../server/server');
const testServer = require('supertest');

describe('test the root path', () => {
    test('it should respond 200 to the LOGOUT route', async () => {
        const respond = await testServer(app).post('/api/user/logout');
        expect(repsonse.statusCode).toBe(200)
    })
})
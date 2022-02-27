const request = require('supertest');
const asyncApp = require('../server').app;
let app;
let token;

beforeAll(async () => {
    app = await asyncApp;
    const response = await request(app)
        .post('/auth/login')
        .send({ name: 'admin', password: 'admin' });

    token = response.body.token;
})

describe('GET /', () => {
    it('should get all sessions', async () => {
        const response = await request(app)
            .get('/session/list')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    })

    it('should receive detailed information about the game session',
        async () => {
            const response = await request(app)
                .get('/session/1/detailedInformation')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });

    it('should get all users of this session',
        async () => {
            const response = await request(app)
                .get('/session/4/users')
                .set('Authorization', `Bearer ${token}`);

            expect(response.statusCode).toBe(200);
        });
})

describe('POST Endpoints', () => {
    it('should create location', async () => {
        const response = await request(app)
            .post('/location/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'City',
                description: 'some kind of settlement',
                poster: 'тут ссылка на картинку',
                file: 'путь к файлу',
                max_users: 5
            })

        expect(response.status).toEqual(200);
    });

    it('should create session', async () => {
        const response = await request(app)
            .post('/session/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Nikita game',
                max_users: '4',
                nameLocation: 'City'
            })

        expect(response.status).toEqual(200);
    });

    it('must connect the user to the game session',
        async () => {
            const response = await request(app)
                .post('/user/1/connecting')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(200);
        });

    // it('must disconnect the user',
    //     async () => {
    //         const response = await request(app)
    //             .post('/user/disconnecting')
    //             .set('Authorization', `Bearer ${token}`);

    //         expect(response.status).toEqual(200);
    //     });
})

describe('DELETE Endpoints', () => {
    it('should delete location', async () => {
        const response = await request(app)
            .post('/location/1/delete')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'City',
                description: 'some kind of settlement',
                poster: 'тут ссылка на картинку',
                file: 'путь к файлу',
                max_users: 5
            })

        expect(response.status).toEqual(200);
    })
})
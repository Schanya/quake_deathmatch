const axios = require('axios');

const getJWTToken = async () => {
    const response = await axios.post(
        `http://127.0.0.1:3000/auth/login`,
        {
            password: 'admin',
            name: 'admin',
        }
    );

    const { token } = response.data;
    return 'Bearer ' + token;
};

describe('GET Endpoints', () => {
    it('should get all sessions', async () => {
        const token = await getJWTToken();
        const { status } = await axios.get(
            'http://127.0.0.1:3000/session/list',
            {
                headers: { 'Authorization': token },
            }
        );

        expect(status).toEqual(200);
    });

    it('should receive detailed information about the game session',
        async () => {
            const token = await getJWTToken();
            const { status } = await axios.get(
                'http://127.0.0.1:3000/session/1/detailedInformation',
                {
                    headers: { authorization: token },
                }
            );

            expect(status).toEqual(200);
        });

    it('should get all users of this session',
        async () => {
            const token = await getJWTToken();
            const { status } = await axios.get(
                'http://127.0.0.1:3000/session/1/users',
                {
                    headers: { authorization: token },
                }
            );

            expect(status).toEqual(200);
        });
});

describe('POST Endpoints', () => {
    it('should create session', async () => {
        const token = await getJWTToken();
        const { status } = await axios.post(
            'http://127.0.0.1:3000/session/create',
            {
                name: 'Nikita game',
                max_users: '4',
                nameLocation: 'City'
            },
            {
                headers: { 'Authorization': token },
            },

        );

        expect(status).toEqual(200);
    });

    it('must connect the user to the game session',
        async () => {
            const token = await getJWTToken();
            const { status } = await axios.post(
                'http://127.0.0.1:3000/user/4/connecting',
                {
                    headers: { 'Authorization': token },
                },
            );

            expect(status).toEqual(200);
        });

    it('must disconnect the user',
        async () => {
            const token = await getJWTToken();
            const { status } = await axios.post(
                'http://127.0.0.1:3000/user/disconnecting',
                {
                    headers: { 'Authorization': token },
                },
            );

            expect(status).toEqual(200);
        });
});
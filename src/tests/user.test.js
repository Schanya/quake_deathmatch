const axios = require('axios');

const getJWTToken = async () => {
    const response = await axios.post(
        `http://127.0.0.1:3000/auth/login`,
        {
            password: 'admin',
            name: 'admin',
        }
    );

    var { token } = response.data;
    return token;
};

describe('Get Endpoints', () => {
    it('should get all sessions', async () => {
        const token = await getJWTToken();
        const { status, data: sessionsData } = await axios.get(
            'http://127.0.0.1:3000/session/list',
            {
                headers: { 'Authorization': 'Bearer ' + token },
            }
        );

        expect(status).toEqual(200);
    });

    // it('should get user bookings', async () => {
    //     const token = await getJWTToken();
    //     const { status, data: userBookingsData } = await axios.get(
    //         'http://127.0.0.1:8000/users/1/booked-rooms',
    //         {
    //             headers: { authorization: token },
    //         }
    //     );

    //     expect(status).toEqual(200);
    //     expect(userBookingsData.status).toEqual('success');
    // });
});
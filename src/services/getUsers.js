const usersRepository = require('../repositories/usersRepository');

class GetAllUsers {
    getUsers = async () => {
        const users = await usersRepository.getAllUsers();
        return users;
    }
}

module.exports = new GetAllUsers();

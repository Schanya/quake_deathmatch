const usersRepository = require('../repositories/usersRepository');

class UsersService {
    getUsers = async () => {
        const users = await usersRepository.getAllUsers();
        return users;
    }
}

module.exports = new UsersService();

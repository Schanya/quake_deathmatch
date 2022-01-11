const usersRepository = require('../repositories/usersRepository');

class UsersService {
    getUsers = async () => {
        const users = await usersRepository.getAllUsers();
        return users;
    }
    deleteUser = async (userId) => {
        await usersRepository.deleteUser(userId)

    }
}

module.exports = new UsersService();

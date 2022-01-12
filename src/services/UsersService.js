const usersRepository = require('../repositories/usersRepository');

class UsersService {
    getUsers = async () => {
        const users = await usersRepository.getAllUsers();
        return users;
    }
    deleteUser = async (userId) => {
        await usersRepository.deleteUser(userId)

    }
    getUserById = async (userId) => {
        const user = await usersRepository.findById(userId);

        return user;
    }
}

module.exports = new UsersService();

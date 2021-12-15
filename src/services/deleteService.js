const usersRepository = require("../repositories/usersRepository")

class DeleteService {
    deleteUser = async (userId) => {
        await usersRepository.deleteUser(userId)

    }
}

module.exports = new DeleteService();
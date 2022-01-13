const { NotFoundError } = require('../errors');
const gameSessionRepository = require('../repositories/gameSessionRepository');
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
    connectingToSession = async (sessionName, userId) => {
        const gameSession = await gameSessionRepository.getGameSession(sessionName);

        if (!gameSession) {
            throw new NotFoundError(`Game session ${gameSession.name} not exist`);
        }

        const user = await usersRepository.findById(userId);
        const users = await gameSessionRepository.getUsersFromGameSession(gameSession);
        if (gameSession.max_users === users) {
            throw new NotFoundError(`The maximum number of players in the game`);
        }

        await gameSessionRepository.addUserToGameSession(gameSession, user);

        if (!gameSession.is_active) {
            gameSession.is_active = true;
        }
    }
}

module.exports = new UsersService();

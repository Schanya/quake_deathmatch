const { NotFoundError } = require('../errors');
const pagination = require('../helpers/pagination');

const gameSessionRepository = require('../repositories/gameSessionRepository');
const usersRepository = require('../repositories/usersRepository');

class UsersService {
    getUsers = async ({ page, amount }) => {
        const options = pagination({ page, amount });
        const users = await usersRepository.getAllUsers(options);
        return users;
    }
    deleteUser = async (userId) => {
        await usersRepository.deleteUser(userId)

    }
    getUserById = async (userId) => {
        const user = await usersRepository.findById(userId);

        return user;
    }
    connectingToSession = async (sessionId, userId) => {
        //Наверное стоит передавать не название сессии, а id
        const gameSession = await gameSessionRepository.getGameSessionById(sessionId);

        if (!gameSession) {
            throw new NotFoundError(`Game session ${gameSession.name} not exist`);
        }
        //добавить проверку, если игрок уже подключён к какой-то игре
        const user = await usersRepository.findById(userId);
        const users = await gameSessionRepository.countUsersFromGameSession(gameSession);//переименовать в count
        if (gameSession.max_users === users) {
            throw new NotFoundError(`The maximum number of players in the game`);
        }

        await gameSessionRepository.addUserToGameSession(gameSession, user);

        if (!gameSession.is_active) {
            gameSession.is_active = true;
        }
    }
    disconnectingFromGameSession = async (userId) => {
        //Если последний человек вышел, сделать сессию неактивной
        const user = await usersRepository.findById(userId);

        const gameSession = await gameSessionRepository.getGameSessionByUser(user);
        const countGameSession = await gameSessionRepository.countSessionByUser(user);

        if (countGameSession === 0) {
            throw new NotFoundError(`You were not connected to this game`)
        }

        gameSessionRepository.disconnecting(user, gameSession);
    }
}

module.exports = new UsersService();

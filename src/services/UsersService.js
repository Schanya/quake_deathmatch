const { NotFoundError, BadRequestError } = require('../errors');
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
        const gameSession = await gameSessionRepository.getGameSessionById(sessionId);

        if (!gameSession) {
            throw new NotFoundError(`Game session ${gameSession.name} not exist`);
        }

        const user = await usersRepository.findById(userId);
        const users = await gameSessionRepository.countUsersFromGameSession(gameSession);

        if (gameSession.max_users === users) {
            throw new NotFoundError(`The maximum number of players in the game`);
        }

        const isUserConnecting = await usersRepository.countGameSession(user);

        if (isUserConnecting === 0) {
            await gameSessionRepository.addUserToGameSession(gameSession, user);

            if (!gameSession.is_active) {
                gameSession.is_active = true;
            }
        } else {
            throw new BadRequestError('You are already connected to the session');
        }

    }
    disconnectingFromGameSession = async (userId) => {
        const user = await usersRepository.findById(userId);
        const gameSession = await gameSessionRepository.getGameSessionByUser(user);
        let countUsers = 0;
        const countGameSession = await gameSessionRepository.countSessionByUser(user);

        if (countGameSession === 0) {
            throw new NotFoundError(`You were not connected to this game`)
        }

        await gameSessionRepository.disconnecting(user, gameSession);

        gameSession.forEach(async (session) => {
            countUsers = await gameSessionRepository.countUsersFromGameSession(session);

            if (countUsers === 0) {
                const options = { is_active: false };
                await gameSessionRepository.update(session, options);
            }
        })
    }
    endpoint = async () => {
        const result = usersRepository.endpoint();

        return result;
    }
}

module.exports = new UsersService();

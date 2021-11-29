module.exports = route => {
    return async (req, res, next) => {
        try {
            await route(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};
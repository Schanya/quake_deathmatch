module.exports = class BaseError extends Error {

    constructor(status, name, message) {
        super(message);
        super.name = name;
        this.status = status;
    }
}
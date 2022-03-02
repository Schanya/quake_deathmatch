module.exports = class Response {
    constructor(message) {
        if (typeof message === "string") {
            this.message = message;
        } else {
            this.body = message;
        }

    }
}
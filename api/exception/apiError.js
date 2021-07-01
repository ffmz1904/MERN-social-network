module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(message, status, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message, errors = []) {
        return new ApiError(message, 400, errors);
    }

    static missingParams(errors = {}) {
        const message = 'Missing required function params!';
        return new ApiError(message, 400, errors);
    }
}

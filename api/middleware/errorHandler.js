const ApiError = require('../exception/apiError');

module.exports = async (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({
           error: true,
           message: err.message,
           errors: err.errors
        });
    }

    res.status(500).json({
        error: true,
        message: 'Unhandled error!'
    });
}

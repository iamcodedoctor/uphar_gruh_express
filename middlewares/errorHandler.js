function errorHandler(err, req, res, next) {
    const errorMessage = err.message || "Internal Server Error"
    const errorStatus = err.status || 500;
    console.log(err.stack);
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage,
        status: errorStatus,
    })
}

export default errorHandler;

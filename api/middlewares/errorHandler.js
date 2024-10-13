const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message });
};

export default errorHandler;
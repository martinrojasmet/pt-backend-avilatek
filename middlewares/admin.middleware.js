const authorizeAdmin = async (req, res, next) => {
    try {

        const user = req.user;

        if (user.role !== 'admin') {
            const error = new Error('User is not admin');
            error.statusCode = 401;
            throw error;
        }

        next();
        
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 401;
        }
        next(error);
    }
};

export default authorizeAdmin;
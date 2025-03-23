const authorizeClient = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const user = req.user;

        console.log(user);
        console.log(userId);

        if (!(user.role === 'admin' || user._id.toString() === userId)) {
            const error = new Error('User is not authorized');
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

export default authorizeClient;
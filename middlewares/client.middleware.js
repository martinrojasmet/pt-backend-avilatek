const authorizeClient = async (req, res, next) => {
    try {

        const userId = req.params.id;

        const user = req.user;

        if (user.role !== 'admin' || user._id !== userId) {
            res.status(401).json({
                success: false,
                error: 'User is not authorized'
            });
        }

        next();
        
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Unauthorized'
        });
    }
};

export default authorizeClient;
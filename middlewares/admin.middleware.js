const authorizeAdmin = async (req, res, next) => {
    try {

        const user = req.user;

        if (user.role !== 'admin') {
            res.status(401).json({
                success: false,
                error: 'User is not admin'
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

export default authorizeAdmin;
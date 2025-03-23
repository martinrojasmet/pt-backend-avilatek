import Order from "../models/order.model.js";

const authorizeOrder = async (req, res, next) => {
    try {

        const orderId = req.params.id;
        const user = req.user;

        const order = await Order.findById(orderId);

        if (!order) {
            const error = new Error('Order not found');
            error.statusCode = 404;
            throw error;
        }

        if (!(user.role === 'admin' || user._id.toString() === order.user.toString())) {
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

export default authorizeOrder;
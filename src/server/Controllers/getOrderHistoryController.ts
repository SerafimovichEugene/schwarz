import OrderHistory from '../models/OrderHistory';


const getOrderHistoryController = async (req, res, next) => {
        try {
            const { user } = req.query;
            console.log(req.query);
            const histories = await OrderHistory.find({user});
            res.status(200).json(histories).end();
        } catch (error) {
            console.log('FROM getOrderHistoryController error', error);
            res.status(500).end();
        }
};
export default getOrderHistoryController;

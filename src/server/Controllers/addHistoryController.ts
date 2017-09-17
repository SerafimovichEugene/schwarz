import OrderHistory from '../models/OrderHistory';


const addHistoryController = async (req, res, next) => {
    try {
        const {
            user,
            orders,
        } = req.body;

        await new OrderHistory({
            user,
            orders,
            time: new Date(),
        }).save();
        res.status(200).end();
    } catch (error) {
        console.log('FROM addHistoryController error', error);
        res.status(500).end();
    }
};

export default addHistoryController;

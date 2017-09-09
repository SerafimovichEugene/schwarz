import Product from '../models/Product';


const getDistinctTypesController = async (req, res, next) => {
        try {
            const distinctProducts = await Product.find().distinct('productType');
            res.status(200).json(distinctProducts).end();
        } catch (error) {
            console.log('FROM getDistinctTypesController error', error);
            res.status(500).end();
        }
};
export default getDistinctTypesController;

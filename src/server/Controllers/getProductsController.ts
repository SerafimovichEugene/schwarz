import Product from '../models/Product';


const getProductsController = async (req, res, next) => {
        try {
            const products = await Product.find({order: true});
            res.status(200).json(products).end();
        } catch (error) {
            console.log('FROM getProductsController error', error);
            res.status(500).end();
        }
};
export default getProductsController;

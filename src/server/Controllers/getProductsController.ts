import Product from '../models/Product';


const getProductsController = async (req, res, next) => {
    let defaultLimit = +req.params.count || 9;
    let query = { order: true };
    let limitations = {};
        for (let option in req.query) {
            let value = req.query[option];
            if (option === 'count') {
                limitations.limit = +value;
            } else if (option === 'currency') {
                query.currency = value;
            } else if (option === 'page') {
                limitations.skip = value * defaultLimit;
            } else if (option === 'productType') {
                query.productType = value;
            }
        }
        try {
            const all = await Product.find(query);
            const products = await Product.find(query, null, limitations);
            res.status(200).json({
                data: products,
                pages: Math.ceil(all.length / defaultLimit),
            }).end();
        } catch (error) {
            console.log('FROM getProductsController error', error);
            res.status(500).end();
        }
};
export default getProductsController;

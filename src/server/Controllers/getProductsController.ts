import Product from '../models/Product';


const getProductsController = async (req, res, next) => {
    let defaultLimit = +req.params.count || 9;
    let query = { order: true, price: { $gt: 0 } };
    let limitations = {};
        for (let option in req.query) {
            let value = req.query[option];
            if (option === 'count') {
                limitations.limit = +value;
            } else if (option === 'currency') {
                query.currency = value;
            } else if (option === 'page') {
                limitations.skip = (value - 1) * defaultLimit;
            } else if (option === 'productType') {
                query.productType = value;
            } else if (option === 'priceFrom') {
                query.price.$gt = +value;
            } else if (option === 'priceTo') {
                query.price.$lt = +value;
            }
        }
        console.log('REQ QUERY', req.query);
        console.log('DB QUERY', query);
        console.log('limitations', limitations);
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

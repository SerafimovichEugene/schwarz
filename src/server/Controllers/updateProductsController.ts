import Product from '../models/Product';

const options = {
    upsert: true,
    new: true
};

const updateProductsController = async (req, res, next) => {
    let canSendRequestBack = false;
    Object.keys(req.body).forEach(key => {
        req.body[key].forEach(async (product, i, arr) => {
            if (product['Валюта']) {
                const query = { name: product['Наименование'] };
                const updateQuery = {
                    name: product['Наименование'],
                    currency: product['Валюта'],
                    order: product['Доступен для заказа'] === '0' ? false : true,
                    purchasePrice: product['Закупочная цена'],
                    crossPrice: product['Зачеркнутая цена'],
                    photo: product['Изображения'],
                    articulCode: product['Код артикула'],
                    status: product['Статус'],
                    productType: product['Тип товаров'],
                    price: product['Цена']
                };
                try {
                    await Product.findOneAndUpdate(query, updateQuery, options);
                    if (i === arr.length - 1) {
                        canSendRequestBack = true;
                    }
                    if (canSendRequestBack) {
                        res.status(200).end();
                    }
                } catch (error) {
                    console.log('FROM updateProductsController error', error);
                    res.status(500).end();
                }
            }
        });
    });
};

export default updateProductsController;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const options = {
    upsert: true,
    new: true
};
const updateProductsController = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let canSendRequestBack = false;
    Object.keys(req.body).forEach(key => {
        req.body[key].forEach((product, i, arr) => __awaiter(this, void 0, void 0, function* () {
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
                    yield Product_1.default.findOneAndUpdate(query, updateQuery, options);
                    if (i === arr.length - 1) {
                        canSendRequestBack = true;
                    }
                    if (canSendRequestBack) {
                        res.status(200).end();
                    }
                }
                catch (error) {
                    console.log('FROM updateProductsController error', error);
                    res.status(500).end();
                }
            }
        }));
    });
});
exports.default = updateProductsController;

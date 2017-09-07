import ProductsDocument from '../models/ProductsDocument';


const getDocumentsController = async (req, res, next) => {
        try {
            const documents = await ProductsDocument.find();
            res.status(200).json(documents).end();
        } catch (error) {
            console.log('FROM getDocumentsController error', error);
            res.status(500).end();
        }
};
export default getDocumentsController;

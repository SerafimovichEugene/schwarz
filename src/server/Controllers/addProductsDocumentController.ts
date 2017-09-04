import ProductsDocument from '../models/ProductsDocument';

const addProductsDocumentController = async (req, res, next) => {
    try {
        const {
            Application,
            Author,
            LastAuthor,
            CreatedDate,
            ModifiedDate,
            SheetNames,
            Worksheets,
        } = req.body.Props;

        const documentParams = {
            Application,
            Author,
            LastAuthor,
            CreatedDate,
            ModifiedDate,
            SheetNames,
            numOfSheets: Worksheets,
        };
        let productsDocument = new ProductsDocument(documentParams);
        await productsDocument.save();
        res.status(200).end();
    } catch (error) {
        console.log('FROM addProductsDocumentController error', error);
        res.status(500).end();
    }
};

export default addProductsDocumentController;

import { connect } from 'react-redux';
import { getProductsSelector } from '../../../selectors/productsSelector';
import { getUserSelector } from '../../../selectors/userSelector';
import { fetchProducts, fetchProductsThrottle } from '../../../actions/productsActions';
import Catalog from '../../presentational/Catalog/Catalog';

export default connect((state) => ({
    products: getProductsSelector(state),
    user: getUserSelector(state),
}), { fetchProducts, fetchProductsThrottle })(Catalog);

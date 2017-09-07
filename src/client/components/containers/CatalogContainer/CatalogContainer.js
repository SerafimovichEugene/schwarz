import { connect } from 'react-redux';
import { getProductsSelector } from '../../../selectors/productsSelector';
import { fetchProducts } from '../../../actions/productsActions';
import Catalog from '../../presentational/Catalog/Catalog';

export default connect((state) => getProductsSelector(state), { fetchProducts })(Catalog);

import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import { getProductsSelector } from '../../../selectors/productsSelector';
import { fetchUser } from '../../../actions/userActions';
import MainAppComponent from '../../presentational/MainAppComponent/MainAppComponent';

export default connect(state => ({
    user: getUserSelector(state),
    products: getProductsSelector(state),
}), { fetchUser })(MainAppComponent);

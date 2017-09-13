import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import Basket from '../../presentational/Basket/Basket';

export default connect((state) => ({
    user: getUserSelector(state),
}))(Basket);

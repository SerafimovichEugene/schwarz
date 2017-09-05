import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import { fetchUser } from '../../../actions/userActions';
import MainAppComponent from '../../presentational/MainAppComponent/MainAppComponent';

export default connect(state => getUserSelector(state), { fetchUser })(MainAppComponent);

import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import { fetchUser } from '../../../actions/userActions';
import AdminPanel from '../../presentational/AdminPanel/AdminPanel';

export default connect(state => getUserSelector(state), { fetchUser })(AdminPanel);

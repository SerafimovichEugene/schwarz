import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import { fetchUser } from '../../../actions/userActions';
import App from '../../presentational/App/App';

export default connect(state => getUserSelector(state), { fetchUser })(App);

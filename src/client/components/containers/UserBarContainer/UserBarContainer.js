import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import UserBar from '../../presentational/UserBar/UserBar';

export default connect(state => getUserSelector(state))(UserBar);

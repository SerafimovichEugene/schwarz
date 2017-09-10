import { connect } from 'react-redux';
import { getUserSelector } from '../../../selectors/userSelector';
import NavBar from '../../presentational/NavBar/NavBar';

export default connect(state => getUserSelector(state))(NavBar);

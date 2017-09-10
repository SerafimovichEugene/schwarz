import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { parse } from 'cookie';
// import classNames from 'classnames';
import UserBar from '../../containers/UserBarContainer/UserBarContainer';
import './MainAppComponent.scss';

export default class MainAppComponent extends Component {

    static propTypes = {
        fetchUser: PropTypes.any.isRequired,
        user: PropTypes.any.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node,
        ]),
    }

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchUser, user } = this.props;
        const { canFetchUser } =  parse(document.cookie);
        if(!user.login && canFetchUser) {
            fetchUser();
        }
    }

    renderUserBar = (user) => {
        if(user.login) {
            return  <UserBar />;
        } 
        return (
            <div className='links'>
                <Link to='/signup'>Registration</Link>
                <Link to='/signin'>Sign in</Link>
            </div>
        )        
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <header>
                    <Link to='/catalog'>Catalog</Link>
                    {this.renderUserBar(user)}
                </header>
                {this.props.children}
                <footer>footer</footer>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import UserBar from '../../containers/UserBarContainer/UserBarContainer';
import './NavBar.scss';

export default class NavBar extends Component {

    static propTypes = {        
        user: PropTypes.any.isRequired,      
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
            <header className='nav-bar'>                
                <Link to='/' className="brand">SCHWARZ</Link>
                <Link to='/catalog' className="catalog-link">Kаталог</Link>
                <Link to='/' className="">Контакты</Link>
                <Link to='/' className="">О нас</Link>
                {this.renderUserBar(user)}
            </header>
        )
    }
}

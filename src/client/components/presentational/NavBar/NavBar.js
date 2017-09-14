import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { WindowResizeListener } from 'react-window-resize-listener'
// import classNames from 'classnames';
import UserBar from '../../containers/UserBarContainer/UserBarContainer';
import './NavBar.scss';

export default class NavBar extends Component {

    static propTypes = {        
        user: PropTypes.any.isRequired,      
    }
    constructor(props) {
        super(props);
        this.state = {
            isToggleMenu: true,
            windowWidth: 0,     
        };
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }
    handleToggleMenu() {
        this.setState({ isToggleMenu: !this.state.isToggleMenu });
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
                <Link to='/' className="menu-brand">SCHWARZ.by</Link>
                <div className='menu-button'>
                    <div        
                        className='menu-icon' 
                        onClick={this.handleToggleMenu}>
                        <i className="fa fa-bars fa-2x" aria-hidden="true" />
                    </div>
                </div>
                <ul
                    id={this.state.isToggleMenu ? 'hide-menu-items' : ''}
                    className='menu-items'>                    
                    <li><Link to='/catalog' className="catalog-link">Kаталог</Link></li>
                    <li><Link to='/' className="">Контакты</Link></li>
                    <li><Link to='/' className="">О нас</Link></li>
                </ul>

                {this.renderUserBar(user)}

            </header>
        )
    }
}

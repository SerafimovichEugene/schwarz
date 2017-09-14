import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import UserBar from '../../../containers/UserBarContainer/UserBarContainer';
import './Header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropMenu: false,
        }
    }


    renderMenu = () => {
        const { user } = this.props;
        if(this.state.showDropMenu) {
            return (
                <div className='drop-menu'>
                    <div className='links'>
                        <Link to='/catalog'>Catalog</Link>
                        <Link to='/info'>Info</Link>
                    </div>
                    {this.renderUserBar(user, 'true')}
                </div>
            )
        }
    }

    handleBarClick = () => {
        this.setState({
            showDropMenu: !this.state.showDropMenu,
        })
    }


    renderUserBar = (user, showInDropMenu) => {
        if(user.login) {
            return  <UserBar showInDropMenu={showInDropMenu} />;
        }
        return (
            <div className='links menu'>
                <Link to='/signup'>Registration</Link>
                <Link to='/signin'>Sign in</Link>
            </div>
        )
    }

    render() {
        const { user } = this.props;
        return (
            <header>
                <div className='logo'>
                    <Link to='/'><h1>schwarz</h1></Link>
                    <i className="arrow right"></i>
                </div>
                <div className='links menu'>
                    <Link to='/catalog'>Catalog</Link>
                    <Link to='/info'>Info</Link>
                </div>
                {this.renderUserBar(user)}
                <FontAwesome
                    onClick={this.handleBarClick}
                    name='bars'
                    size='2x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                {this.renderMenu()}
            </header>
        )
    }
}

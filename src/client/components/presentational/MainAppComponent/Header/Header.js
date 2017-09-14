import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserBar from '../../../containers/UserBarContainer/UserBarContainer';
import './Header.scss';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }



    renderUserBar = (user) => {
        if(user.login) {
            return  <UserBar />;
        } else {
            return (
                <div className='links'>
                    <Link to='/signup'>Registration</Link>
                    <Link to='/signin'>Sign in</Link>
                </div>
            )
        }
    }

    render() {
        const { user } = this.props;
        return (
            <header>
                <div className='logo'>
                    <h1>schwarz</h1>
                    <i className="arrow right"></i>
                </div>
                <div className='links'>
                    <Link to='/catalog'>Catalog</Link>
                    <Link to='/info'>Info</Link>
                </div>
                {this.renderUserBar(user)}
            </header>
        )
    }
}

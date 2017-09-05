import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './UserBar.scss';

export default class UserBar extends Component {
    constructor(props) {
        super(props);
    }

    renderAdminLink = (user) => {
        if(user.isAdmin) {
            return (
                <Link to='/admin'>AdminPanel</Link>
            )
        }
    }

    render() {
        const { user } = this.props;
        console.log('FROM USER BAR ', user);
        // const userBarClasses = classNames({
        //     none: !user.login,
        // });
        return (
            // <div className={userBarClasses}>
            <div className='userBar'>
                <p>{user.login}</p>
                <img src={user.photo} className='avatar'/>
                {this.renderAdminLink(user)}
                <a href='/auth/logout'>Logout</a>
            </div>
        )
    }
}

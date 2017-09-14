import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import './UserBar.scss';

export default class UserBar extends Component {

    static propTypes = {        
        user: PropTypes.any.isRequired,        
    }

    constructor(props) {
        super(props);
        this.state = {
            isToggleMenu: true,   
        };
    }

    handleToggleMenu = () => {
        this.setState({ isToggleMenu: !this.state.isToggleMenu });
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
        // console.log('FROM USER BAR ', user);
        // const userBarClasses = classNames({
        //     none: !user.login,
        // });
        return (
            <div className='userBar'>
                <div className='userBar-wrapper' onClick={this.handleToggleMenu}>
                    <img src={user.photo} className='userBar-avatar'/>
                    <div className='userBar-icons'>
                        <i className="fa fa-caret-down" aria-hidden="true" />
                    </div>
                </div>                
                <ul 
                    className='userBar-list'
                    id={this.state.isToggleMenu ? 'hide-userBar-list' : ''}
                >
                    <li><p>{user.login}</p></li>
                    <li>{this.renderAdminLink(user)}</li>
                    <li><a href='/auth/logout'>Logout</a></li>
                </ul>
            </div>
        )
    }
}

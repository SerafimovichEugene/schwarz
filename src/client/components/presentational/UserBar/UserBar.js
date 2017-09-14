import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './UserBar.scss';

export default class UserBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
        }
    }

    renderAdminLink = (user) => {
        if(user.isAdmin) {
            return (
                <Link to='/admin'>AdminPanel</Link>
            )
        }
    }

    renderTooltip = () => {
        const { user } = this.props;
        if(this.state.showTooltip) {
            return (
                <div className='tooltip'>
                    <div className='triangle'></div>
                    <div>{user.login}</div>
                </div>
            )
        }
    }

    handleAvatarIn = (e) => {
        this.setState({
            showTooltip: true,
        })
    }

    handleAvatarOut = () => {
        this.setState({
            showTooltip: false,
        })
    }

    render() {
        const { user } = this.props;
        return (
            <div className='userBar'>
                <div className='links'>
                    <Link to='/basket'>Basket</Link>
                    {this.renderAdminLink(user)}
                </div>
                {/* <p>{user.login}</p> */}
                <img src={user.photo}
                    onMouseOver={this.handleAvatarIn}
                    onMouseOut={this.handleAvatarOut}
                    className='avatar'/>
                {this.renderTooltip()}
                <a className='logout' href='/auth/logout'>Logout</a>
            </div>
        )
    }
}

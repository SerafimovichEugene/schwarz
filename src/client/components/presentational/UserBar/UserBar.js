import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import './UserBar.scss';

export default class UserBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTooltip: false,
            x: 0,
            y: 0,
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
            const tooltipStyle = {
                top: this.state.y + 20,
            }
            return (
                <div className='tooltip' style={tooltipStyle}>
                    <div className='triangle'></div>
                    <div>{user.login}</div>
                </div>
            )
        }
    }

    handleAvatarIn = (e) => {
        this.setState({
            showTooltip: true,
            x: e.pageX,
            y: e.pageY,
        })
    }

    handleAvatarOut = () => {
        this.setState({
            showTooltip: false,
        })
    }

    render() {
        const { user, showInDropMenu } = this.props;
        return (
            <div className={showInDropMenu ? 'userBar-drop' : 'userBar'}>
                <div className='links'>
                    <Link to='/basket'>Basket</Link>
                    {this.renderAdminLink(user)}
                </div>
                {/* <p>{user.login}</p> */}
                <img src={user.photo}
                    onMouseOver={!showInDropMenu && this.handleAvatarIn}
                    onMouseOut={!showInDropMenu && this.handleAvatarOut}
                    className='avatar'/>
                {this.renderTooltip()}
                <a className='logout' href='/auth/logout'>Logout</a>
            </div>
        )
    }
}

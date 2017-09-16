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

    _setLeft = () => {
        if(window.innerWidth > 860) {
            if(this.userbardiv) {
                this.setState({
                    left: 9,
                })
            }
        } else if(window.innerWidth <= 860) {
            if(this.div) {
                const { width } = this.div.getBoundingClientRect();
                const left = (width/2) - 45;
                this.setState({
                    left,
                });
            }
        }
    }
    // shouldComponentUpdate() {
    //     if(window.innerWidth > 860) {
    //         window.removeEventListener('resize', this._setLeft);
    //     }
    //     return true;
    // }

    componentDidMount() {
        this._setLeft();
        if(window.innerWidth <= 860) {
            window.addEventListener('resize', this._setLeft);
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
                top: `${this.state.y + 20}px`,
                left: `${this.state.x - 80}px`
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

    renderCounter = () => {
        if(+this.props.orderItems) {
            return <div
                className ='counter'
                style={{left: `${this.state.left}px`}}>
                {this.props.orderItems}
            </div>

        }
    }

    render() {
        const { user, showInDropMenu } = this.props;
        return (
            <div className={showInDropMenu ? 'userBar-drop' : 'userBar'} ref={(userbardiv) => this.userbardiv = userbardiv}>
                <div className='links' ref={(div) => this.div = div}>
                    {this.renderCounter()}
                    {/* <div className='relative-count'> */}
                    <Link to='/basket'>Basket</Link>
                    {/* </div> */}
                    {this.renderAdminLink(user)}
                </div>
                {/* <p>{user.login}</p> */}
                <div className='wrapper-for-tooltip'>
                    <img src={user.photo}
                        onMouseOver={!showInDropMenu && this.handleAvatarIn}
                        onMouseOut={!showInDropMenu && this.handleAvatarOut}
                        className='avatar'/>
                    {this.state.showTooltip && this.renderTooltip()}
                </div>
                <a className='logout' href='/auth/logout'>Logout</a>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import PropTypes from 'prop-types';
import { parse } from 'cookie';
import UserBar from '../../containers/UserBarContainer/UserBarContainer';

export default class AdminPanel extends Component {

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
        this.state = {
            isDrawerOpen: false,
        };
    }

    componentWillMount() {
        const { fetchUser, user } = this.props;
        const { canFetchUser } =  parse(document.cookie);
        if(!user.login && canFetchUser) {
            fetchUser();
        }
    }

    handleMenuTouch = () => {
        this.setState({
            isDrawerOpen: !this.state.isDrawerOpen,
        });
    }

    render() {
        return (
            <div>
                <AppBar
                    iconElementRight={ <UserBar/> }
                    onLeftIconButtonTouchTap={ this.handleMenuTouch }
                />
                <Drawer open={ this.state.isDrawerOpen }
                    onRequestChange={ this.handleMenuTouch }
                    docked={ false }
                    width={150}
                >
                    <MenuItem
                        containerElement={ <Link to="/" /> }
                        primaryText="Home"
                        onTouchTap={ this.handleMenuTouch }
                    />
                    <Divider />
                    <MenuItem
                        containerElement={ <Link to="/admin/parser" /> }
                        primaryText="Parser"
                        onTouchTap={ this.handleMenuTouch }
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Add new admin"
                        onTouchTap={ this.handleMenuTouch }
                    />
                    <Divider />
                    <MenuItem
                        primaryText="Statistics"
                        onTouchTap={ this.handleMenuTouch }
                    />
                    <Divider />
                </Drawer>
                {this.props.children}
            </div>
        )
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { parse } from 'cookie';
// import classNames from 'classnames';
import NavBar from '../../containers/NavBarContainer/NavBarContainer';
import './MainAppComponent.scss';

export default class MainAppComponent extends Component {

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
    }
    componentWillMount() {
        const { fetchUser, user } = this.props;
        const { canFetchUser } =  parse(document.cookie);
        if(!user.login && canFetchUser) {
            fetchUser();
        }
    }

    render() {
        // const { user } = this.props;
        return (
            <div>
                <NavBar />

                {this.props.children}
                <footer>footer</footer>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { parse } from 'cookie';
import PropTypes from 'prop-types';

export default class App extends Component {

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
    componentDidMount() {
        const { fetchUser, user } = this.props;
        const { canFetchUser } =  parse(document.cookie);
        if(!user.login && canFetchUser) {
            fetchUser();
        }
    }
    render() {
        return (
            <div className='App'>
                {this.props.children}
            </div>
        )
    }
}

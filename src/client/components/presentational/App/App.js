import React, { Component } from 'react';
import { parse } from 'cookie';


export default class App extends Component {
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

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class CantAcces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canRedirect: false,
        }
    }

    redirectAfterDelay = (delay) => {
        setTimeout(() => {
            this.setState({
                canRedirect: true,
            });
            // window.location.href = '/';
        }, delay);
        if(this.state.canRedirect) {
            return (<Redirect to='/'/>)
        }
    }

    render() {
        return (
            <div>You cant acces this page
                {this.redirectAfterDelay(1500)}
            </div>
        )
    }
}

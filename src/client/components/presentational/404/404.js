import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './404.scss';

export default class NoMatch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pathname } = this.props.location;
        return (
            <div className='go-back'>
                {`Ooops. This page does not exist! This path is not valid ${pathname}`}
                <Link to='/'>Go Back</Link>
            </div>
        )
    }
}

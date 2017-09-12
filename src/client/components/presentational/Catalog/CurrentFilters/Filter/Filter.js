import React, { Component } from 'react';
import './Filter.scss';

export default class Filter extends Component {
    constructor(props) {
        super(props);
    }

    produceText = () => {
        const {filterName, filterValue} = this.props;
        if(filterName === 'currentCurrency' || filterName === 'productType') {
            return `${filterValue}`
        } else {
            return `${filterName} : ${filterValue}`;
        }
    }

    render() {
        return (
            <div className='filter'>
                {this.produceText()}
            </div>
        )
    }
}

import React, { Component } from 'react';
import Filter from './Filter/Filter';
import './CurrentFilters.scss';

export default class CurrentFilters extends Component {
    constructor(props) {
        super(props);
    }

    produceCurrentFilters = (filters) => {
        return Object.keys(filters).map((fName, i) => {
            if(filters[fName] && filters[fName] !== Infinity) {
                return <Filter
                    key={i}
                    filterName={fName}
                    filterValue={filters[fName]}
                />
            }
        })
    }

    render() {
        return (
            <div className='current-filters'>
                {this.produceCurrentFilters(this.props.filters)}
            </div>
        )
    }
}

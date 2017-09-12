import React, { Component } from 'react';
import Card from './Card/Card';
import './CardList.scss';

const stylePaginationRoot = {
    width: '100%',
    margin: '0 auto',
}

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    render() {
        const { products } = this.props;
        return (
            <div className='card-list'>
                {
                    products.map(product => {
                        return <Card key={product.name} product={product} />
                    })
                }
            </div>
        )
    }
}

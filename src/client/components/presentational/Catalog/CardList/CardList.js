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
        const { products, user } = this.props;
        return (
            <div className='card-list'>
                {
                    products.map(product => {
                        return <Card
                            addProductToBasket={this.props.addProductToBasket}
                            onOrder={this.props.onOrder}
                            history={this.props.history}
                            key={product.name}
                            product={product}
                            login={user} />
                    })
                }
            </div>
        )
    }
}

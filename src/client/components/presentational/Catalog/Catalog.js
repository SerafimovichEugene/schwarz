import React, { Component } from 'react';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import Card from './Card/Card';
import './Catalog.scss';

export default class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filer: {
                currency: 'RUB',
                maxPrice: '5000'
            }
        }
    }

    componentWillMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }


    renderCards = () => {
        const { isLoading } = this.props;
        if(isLoading) {
            return 'is loading....';
        } else {
            let { products } = this.props;
            if(products.length) {
                let filtered = products
                                .filter((product) => product.currency === 'RUB')
                                .filter((product) => +product.price <= 500);
                console.log(filtered);
                return filtered.map((product, i) => {
                    return <Card key={i}
                        product={product}/>
                })
            }
        }
    }

    render() {
        return (
            <MainAppComponent>
                <div className='catalog'>
                    {this.renderCards()}
                </div>
            </MainAppComponent>
        )
    }
}

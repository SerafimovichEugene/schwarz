import React, { Component } from 'react';
import { serealizeDataToLocalStorage } from '../../../../../../build/utils/utils';

import './Order.scss';

export default class Order extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { login, onRemove } = this.props;
        const { name } = this.props.order;
        let data = JSON.parse(localStorage.getItem(login));
        let index = null;
        for(let i = 0; i < data.length; i++) {
            let currentProduct = data[i];
            if(currentProduct.name === name) {
                index = i;
                break;
            }
        }
        data.splice(index, 1);
        serealizeDataToLocalStorage(login, data);
        onRemove();
    }

    render() {
        const { name, currency, photo, price } = this.props.order;
        return (
            <div className='order'>
                <img src={photo} />
                <p>{name}</p>
                <div className='wrap-price'>
                    <p className='price'>{`${price} ${currency}`}</p>
                    <div onClick={this.handleClick} className='remove'>remove</div>
                </div>
            </div>
        )
    }
}

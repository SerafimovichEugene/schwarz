import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { serealizeDataToLocalStorage } from '../../../../../../../build/utils/utils';
import './Card.scss';

export default class Card extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        const { login } = this.props;
        if(!login) {
            this.props.history.push('/signin');
        } else {
            const { name, currency, photo, productType, price } = this.props.product;
            const productInfo = { name, currency, photo, price };
            const data = localStorage.getItem(login);
            if(data) {
                let parsedData;
                try {
                    parsedData = JSON.parse(data);
                    parsedData.push(productInfo);
                    serealizeDataToLocalStorage(login, parsedData);
                } catch (e) {
                    console.log(e);
                }
            } else {
                const arr = [];
                arr.push(productInfo);
                serealizeDataToLocalStorage(login, arr);
            }
        }
    }

    render() {
        const { name, currency, photo, productType, price } = this.props.product;
        return (
            <div className='card'>
                <img src={photo} />
                <FontAwesome
                    name='picture-o'
                    size='2x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                <p className='productType'>{productType}</p>
                <h2>{name}</h2>
                <p className='price'>{`${price} ${currency}`}</p>
                <div className='buy' onClick={this.handleClick}>Купить</div>
            </div>
        )
    }
}

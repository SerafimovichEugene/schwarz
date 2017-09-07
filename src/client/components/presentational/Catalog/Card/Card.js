import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './Card.scss';
export default class Card extends Component {
    constructor(props) {
        super(props);
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
                <Link to="#">Купить</Link>
            </div>
        )
    }
}

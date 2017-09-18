import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import { openURL } from '../../../../../../build/utils/utils';

import './Footer.scss';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }

    handleCLick = (e) => {
        e.preventDefault();
        openURL(e.target.getAttribute('href'), 'developer', '862', '826');
    }

    render() {
        return (
            <footer>
                <div className='contacts'>
                    <p className='phone-to'>+375 29 638 30 74</p>
                    <p className='email-to'><a href="mailto:fanfasiuss@gmail.com?Subject=Hello">fanfasiuss@gmail.com</a></p>
                </div>
                <div className='social-media'>
                    <FontAwesome
                        onClick={this.handleBarClick}
                        name='vk'
                        size='lg'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <FontAwesome
                        onClick={this.handleBarClick}
                        name='facebook'
                        size='lg'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                    <FontAwesome
                        onClick={this.handleBarClick}
                        name='twitter'
                        size='lg'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                </div>
                <div className='made-by'>
                    <p>made by <a onClick={this.handleCLick} href='https://vk.com/id41748367'> Denis </a> and <a onClick={this.handleCLick} href='https://vk.com/pooh_che'> Jenya </a></p>
                </div>
            </footer>
        )
    }
}

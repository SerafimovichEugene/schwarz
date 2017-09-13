import React, { Component } from 'react';
import Order from './Order/Order';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import './Basket.scss';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showProcess: false,
        }
    }

    handleRemove = () => {
        this.forceUpdate();
    }

    handleProcessClick = () => {
        this.setState({
            showProcess: true,
        });
    }

    visualizeData = () => {
        const { login } = this.props.user.user;
        const orders = JSON.parse(localStorage.getItem(login));
        if(orders && orders.length) {
            return (
                <div className='wrapper-orders'>
                    <div className='orders'>
                        {this.renderOrders(orders, login)}
                    </div>
                    <div className='wrapper-process'>
                        <div
                            className='process-order'
                            onClick={this.handleProcessClick}
                        >Оформить заказ</div>
                    </div>
                    {this.renderProcess()}
                </div>
            )
        }
        return 'Вы еще ничего не заказали';
    }

    renderProcess = () => {
        if(this.state.showProcess) {
            return (
                <form action='/api/process' method='POST'>
                <input type="text" className="form-control" name="email"/>
                <input type='text' name='phone'/>
                <button type="submit" className="btn btn-warning btn-lg">Заказать</button>
                </form>
            )
        }
    }

    renderOrders = (orders, login) => {
        return orders.map((order, i) => {
            return <Order
                onRemove={this.handleRemove}
                login={login}
                key={i}
                order={order} />
        })
    }


    render() {
        return (
            <MainAppComponent>
                <div className='basket'>
                    {this.visualizeData()}
                </div>
            </MainAppComponent>
        )
    }
}

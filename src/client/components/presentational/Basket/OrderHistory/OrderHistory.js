import React, { Component } from 'react';
import { getHistories } from '../../../../services/products';
import { produceHumanReadableDate } from '../../../../../../build/utils/utils';
import History from './History/History';
import './OrderHistory.scss';


export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: null,
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user) {
            getHistories(nextProps.user).then(history => {
                this.setState({
                    history,
                })
            })
        }
    }

    handleHistoryClick = (orders) => {
        console.log(orders);
    }

    renderHistories = () => {
        if(this.state.history) {
            return this.state.history.map((history, index) => {
                let date = new Date(history.time);
                date = produceHumanReadableDate(date);
                return <History
                    time={date}
                    handleHistoryClick={this.handleHistoryClick}
                    orders={history.orders}
                    key={index} />
                // return <div className='time' key={index}>
                //     {produceHumanReadableDate(date)}
                // </div>
            })
        }
    }


    render() {
        return (
            <div className='order-history'>
                {this.renderHistories()}
            </div>
        )
    }
}

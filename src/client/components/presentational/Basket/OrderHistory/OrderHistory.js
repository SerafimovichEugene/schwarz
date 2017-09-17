import React, { Component } from 'react';
import { getHistories } from '../../../../services/products';
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

    renderHistories = () => {
        if(this.state.history) {
            return this.state.history.map((h, i) => {
                const t = new Date(h.time);
                return <div className='time' key={i}>
                    {`${t.getFullYear()} ${t.getMonth() + 1} ${t.getDate()} ${t.getHours()}: ${t.getMinutes()}`}
                </div>
            })
        }
    }


    render() {
        console.log(this.state);
        return (
            <div className='order-history'>
                {this.renderHistories()}
            </div>
        )
    }
}

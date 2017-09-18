import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import Order from '../../Order/Order';
import './History.scss';

export default class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    handleClick = () => {
        const { orders } = this.props;
        this.setState({
            open: true,
        });
        // this.props.handleHistoryClick(orders);
    }

    render() {
        return (
            <div className='history' onClick={this.handleClick}>
                {this.props.time}
                <Dialog
                    repositionOnUpdate={ true }
                    autoDetectWindowHeight={ true }
                    autoScrollBodyContent={ true }
                    className="dialog-root"
                    contentClassName="dialog-content"
                    bodyClassName="dialog-body"
                    onRequestClose={ this.handleClose }
                    modal={ false }
                    open={ this.state.open }
                >
                    {
                        this.props.orders.map((order, i) => {
                            return <Order
                                noRemove={true}
                                key={i}
                                order={order}/>
                        })
                    }
                </Dialog>
            </div>
        )
    }
}

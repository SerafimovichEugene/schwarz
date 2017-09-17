import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import MapWithASearchBox from './Map/Map';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import Order from './Order/Order';
import OrderHistory from './OrderHistory/OrderHistory';
import { validatePhone } from '../../../../../build/utils/utils';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import { orderComplete, addhistory } from '../../../services/products';
import './Basket.scss';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            nameErrorText: '',
            nameIsValid: false,
            phoneErrorText: '',
            phoneIsValid: false,
            addressErrorText: '',
            addressIsValid: false,
            finished: false,
            stepIndex: 0,
            openMap: false,
        }
    }

    componentWillMount() {
        fetch('https://ipinfo.io/geo')
            .then(res => res.json())
            .then(data => {
                const [lat, lng] = data.loc.split(',');
                this.setState({
                    lat,
                    lng,
                });
            })
    }

    _check = () => {
        if(this.state.nameIsValid && this.state.phoneIsValid) {
            this.setState({
                isValid: true,
            })
        } else {
            this.setState({
                isValid: false,
            })
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        this._check();
        if(name === 'name') {
            if(value.length < 2) {
                this.setState({
                    nameErrorText: 'invalid name',
                    nameIsValid: false,
                })
                if(value === '') {
                    this.setState({
                        nameErrorText: '',
                        nameIsValid: false,
                    })
                }
            } else {
                this.setState({
                    nameErrorText: '',
                    nameIsValid: true,
                })
            }
        } else if(name === 'phone') {
            if(!validatePhone(value)) {
                this.setState({
                    phoneErrorText: 'invalid phone',
                    phoneIsValid: false,
                })
                if(value === '') {
                    this.setState({
                        phoneErrorText: '',
                        phoneIsValid: false,
                    })
                }
            } else {
                this.setState({
                    phoneErrorText: '',
                    phoneIsValid: true,
                })
            }
        } else if(name === 'address') {
            if(value.length < 7) {
                this.setState({
                    addressErrorText: 'invalid address',
                    addressIsValid: false,
                })
                if(value === '') {
                    this.setState({
                        addressErrorText: '',
                        addressIsValid: false,
                    })
                }
            } else {
                this.setState({
                    addressErrorText: '',
                    addressIsValid: true,
                })
            }
        }
    }

    handleRemove = () => {
        this.forceUpdate();
    }


    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 1,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleOpenMap = () => {
        this.setState({
            openMap: true,
        });
    }

    handleCloseMap = () => {
        this.setState({
            openMap: false,
        });
    }

    handleSubmitMap = (address) => {
        this.setState({
            address,
        });
        this._check();
        this.handleCloseMap();
    }

    handleSubmit = async () => {
        const { login } = this.props.user.user;
        const orders = JSON.parse(localStorage.getItem(login));
        const {name, phone, address } = this.state;
        const result = {
            name, phone, address, orders,
        }
        await orderComplete(result);
        await addhistory({
            user: login,
            orders,
        });
        localStorage.removeItem(login);
        this.forceUpdate();
        console.log('DONE');
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;
        return (
            <div className='wrapper-process'>
                {step === 0 && (
                    <div
                        className='process-order'
                        onClick={this.handleNext}
                    >Далее</div>
                )}
                {step > 0 && (
                    <button
                        disabled={!this.state.isValid}
                        onClick={this.handleSubmit}
                        className={`process-order ${!this.state.isValid && 'blocked'}`}>Заказать</button>
                )}
                {step > 0 && (
                    <div
                        className='process-order back'
                        onClick={this.handlePrev}
                    >Назад</div>
                )}
            </div>
        );
    }

    visualizeData = () => {
        const {finished, stepIndex} = this.state;
        const { login } = this.props.user.user;
        const orders = JSON.parse(localStorage.getItem(login));
        if(orders && orders.length) {
            return (
                <div className='wrapper-orders'>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Check your order items</StepLabel>
                            <StepContent>
                                <div className='orders'>
                                    {this.renderOrders(orders, login)}
                                </div>
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel>Fill in your personal information</StepLabel>
                            <StepContent>
                                {this.renderProcess()}
                            </StepContent>
                        </Step>
                    </Stepper>
                    {/* <OrderHistory user={login} /> */}
                </div>
            )
        }
        return 'Вы еще ничего не заказали';
        // <div>
        // <OrderHistory user={login} />
        // </div>

    }

    renderProcess = () => {
        return (
            <div className='process'>
                <TextField
                    name='name'
                    errorText={this.state.nameErrorText}
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    hintText="name"
                    floatingLabelText="name"
                />
                <TextField
                    name='phone'
                    errorText={this.state.phoneErrorText}
                    onChange={this.handleInputChange}
                    value={this.state.phone}
                    hintText="+375XXXXXXXXX"
                    floatingLabelText="phone number"
                />
                <TextField
                    name='address'
                    errorText={this.state.addressErrorText}
                    onChange={this.handleInputChange}
                    value={this.state.address}
                    hintText="address"
                    floatingLabelText="address"
                />
                {window.innerWidth > 860 && <div className='or'>or</div>}
                {window.innerWidth > 860 && (
                    <div style={{borderBottom: '1px solid #ddd'}}>
                        <div className='process-order map' onClick={this.handleOpenMap}>Open Map</div>
                    </div>
                )}
                <Dialog
                    repositionOnUpdate={ true }
                    autoDetectWindowHeight={ true }
                    autoScrollBodyContent={ true }
                    className="dialog-root"
                    contentClassName="dialog-content"
                    bodyClassName="dialog-body"
                    onRequestClose={ this.handleCloseMap }
                    modal={ false }
                    open={ this.state.openMap }
                >
                    <div className="dialog-scroll">
                        <MapWithASearchBox
                            submitMap={this.handleSubmitMap}
                            lat={this.state.lat}
                            lng={this.state.lng} />
                    </div>
                </Dialog>
                {/* <Dialog
                    title="Dialog With Actions"
                    // actions={actions}
                    modal={false}
                    open={this.state.openMap}
                    onRequestClose={this.handleCloseMap}
                >
                    <div>
                        <MapWithASearchBox lat={this.state.lat} lng={this.state.lng} />
                    </div>
                </Dialog> */}
                {this.renderStepActions(1)}
            </div>
        )
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
        const { isVerifed, login } = this.props.user.user;
        return (
            <MainAppComponent>
                {!isVerifed && <div className='message'>We send you email. Please verefie your accaunt.</div>}
                <div className='basket'>
                    {this.visualizeData()}
                </div>
                <OrderHistory user={login} />
            </MainAppComponent>
        )
    }
}

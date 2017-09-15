import React, { Component } from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import Order from './Order/Order';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import './Basket.scss';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // showProcess: false,
            finished: false,
            stepIndex: 0,
        }
    }

    handleRemove = () => {
        this.forceUpdate();
    }

    // handleProcessClick = () => {
    //     this.setState({
    //         showProcess: true,
    //
    //     });
    // }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
    }

    renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
        //   <div style={{margin: '12px 0'}}>
            <div className='wrapper-process'>
                {step === 0 && (
                    <div
                        className='process-order'
                        onClick={this.handleNext}
                    >Далее</div>
                )}
                {step > 0 && (
                    <button
                        onClick={this.handleSubmit}
                        type='submit'
                        className='process-order'>Заказать</button>
                )}
                {step > 0 && (
                    <div
                        className='process-order back'
                        onClick={this.handlePrev}
                    >Назад</div>
                )}
            </div>
        //     {step > 0 && (
        //       <FlatButton
        //         label="Back"
        //         disabled={stepIndex === 0}
        //         disableTouchRipple={true}
        //         disableFocusRipple={true}
        //         onClick={this.handlePrev}
        //       />
        //     )}
        //   </div>
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
                    {/* {this.renderProcess()} */}
                </div>
            )
        }
        return 'Вы еще ничего не заказали';
    }

    renderProcess = () => {
        return (
            <form
                action='/api/process'
                method='POST' >
                <input type="text" className="form-control" name="email"/>
                <input type='text' name='phone'/>
                {this.renderStepActions(1)}
            </form>
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
        const { isVerifed } = this.props.user.user;
        return (
            <MainAppComponent>
                {!isVerifed && <div className='message'>We send you email. Please verefie your accaunt.</div>}
                <div className='basket'>
                    {this.visualizeData()}
                </div>
            </MainAppComponent>
        )
    }
}

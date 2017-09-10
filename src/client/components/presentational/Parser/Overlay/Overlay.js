import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Overlay.scss';

export default class Overlay extends Component {

    static propTypes = {
        fail: PropTypes.bool.isRequired,
        complete: PropTypes.bool.isRequired,
        show: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            notifyFail: false,
            notifyComplete: false,
        }
    }

    componentWillReceiveProps() {
        if(this.props.fail) {
            this.setState({
                notifyFail: true,
            });
            setTimeout(() => {
                this.setState({
                    notifyFail: false,
                });
            }, 900);
        } else if(this.props.complete) {
            this.setState({
                notifyComplete: true,
            });
            setTimeout(() => {
                this.setState({
                    notifyComplete: false,
                })
            }, 900);
        }
    }

    renderSpinner() {
        if(this.state.notifyComplete) {
            return (
                <FontAwesome
                    name='check-square-o'
                    size='2x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
            )
        } else if(this.state.notifyFail) {
            return (
                <FontAwesome
                    name='window-close'
                    size='2x'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                />
            )
        }
        return (
            <FontAwesome
                name='spinner'
                size='2x'
                spin
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
        )
    }

    render() {
        const overlayClasses = classNames({
            overlay: true,
            none: !this.props.show && !this.state.notifyFail && !this.state.notifyComplete,
            fail: this.state.notifyFail,
            complete: this.state.notifyComplete,
        });
        return (
            <div className={overlayClasses}>
                <div className='text'>
                    {this.renderSpinner()}
                    <div>
                        { this.state.notifyComplete ? 'file is loaded' : this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}


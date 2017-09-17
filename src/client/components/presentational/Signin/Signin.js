import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';
import { parse } from 'cookie';
import { validateEmail } from '../../../../../build/utils/utils';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';

import './Signin.scss';

export default class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: false,
            errorEmailText: '',
            emailIsValid: false,
            errorPasswordText: '',
            passwordIsValid: false,

        }
    }


    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
        if(this.state.passwordIsValid && this.state.emailIsValid) {
            this.setState({
                isValid: true,
            })
        } else {
            this.setState({
                isValid: false,
            })
        }
        if (e.target.name === 'email') {
            if(!validateEmail(value)) {
                this.setState({
                    errorEmailText: 'type valid email',
                    emailIsValid: false,
                })
                if(value === '') {
                    this.setState({
                        errorEmailText: '',
                        emailIsValid: false,
                    })
                }
            } else {
                this.setState({
                    errorEmailText: '',
                    emailIsValid: true,
                })
            }
        } else if(e.target.name === 'password') {
            if(value.length < 7) {
                this.setState({
                    errorPasswordText: 'password must be greater than 7',
                    passwordIsValid: false,
                })
                if(value === '') {
                    this.setState({
                        errorPasswordText: '',
                        passwordIsValid: false,
                    })
                }
            } else {
                this.setState({
                    errorPasswordText: '',
                    passwordIsValid: true,
                })
            }
        }
    }

    render() {
        const { failLogin } = parse(document.cookie);
        return (
            <MainAppComponent>
                { failLogin && <div className='err-message'>email or password is invalid</div>}
                <div className='signin'>
                    <a className='btn btn-social btn-vk btn-block' href='/auth/vkontakte'>
                        <FontAwesome
                            name='vk'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        Sign in with VK

                    </a>
                    <a  className='btn btn-social btn-twitter btn-block' href='/auth/twitter'>
                        <FontAwesome
                            name='twitter'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        Sign in with Twitter

                    </a>
                    <a className='btn btn-social btn-facebook btn-block' href='/auth/facebook'>
                        <FontAwesome
                            name='facebook'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        Sign in with Facebook

                    </a>
                    <a className='btn btn-social btn-google btn-block' href='/auth/google'>
                        <FontAwesome
                            name='google'
                            size='lg'
                            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                        />
                        Sign in with Google

                    </a>
                    <div className='or'>or</div>
                    <form action="/auth/signin" method="post">
                        <TextField
                            errorText={this.state.errorEmailText}
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            name='email'
                            hintText="email"
                            floatingLabelText="email"
                        />
                        <TextField
                            errorText={this.state.errorPasswordText}
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            type='password'
                            name='password'
                            hintText="password"
                            floatingLabelText="password"
                        />
                        <button disabled={!this.state.isValid} type="submit" className={`btn btn-can ${!this.state.isValid && 'btn-not'}`}>Signin</button>
                    </form>
                </div>
            </MainAppComponent>
        )
    }
}

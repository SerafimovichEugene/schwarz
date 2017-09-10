import React, { Component } from 'react';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';

export default class Signin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <MainAppComponent>
                <div>
                    <a href='/auth/vkontakte'>vk</a>
                    <a href='/auth/twitter'>twitter</a>
                    <a href='/auth/facebook'>facebook</a>
                    <a href='/auth/google'>google</a>
                    <form action="/auth/signin" method="post">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email"/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" name="password"/>
                        </div>
                        <button type="submit" className="btn btn-warning btn-lg">Signup</button>
                    </form>
                </div>
            </MainAppComponent>
        )
    }
}

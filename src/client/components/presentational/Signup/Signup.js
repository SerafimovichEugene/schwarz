import React, { Component } from 'react';
import './Signup.scss';
export default class Signup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <a href='/auth/vkontakte'>vk</a>
                <a href='/auth/twitter'>twitter</a>
                <a href='/auth/facebook'>facebook</a>
                <a href='/auth/google'>google</a>
                <form action="/auth/signup" method="post">
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

        )
    }
}

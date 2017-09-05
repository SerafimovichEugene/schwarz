import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import store from '../../../store/store';
import App from '../App/App';
import MainAppComponent from '../MainAppComponentContainer/MainAppComponentContainer';
import Parser from '../../presentational/Parser/Parser';
import Signup from '../../presentational/Signup/Signup';
import Signin from '../../presentational/Signin/Signin.js';
import AdminPanel from '../../presentational/AdminPanel/AdminPanel';
import './root.scss';

export default class Root extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' component={MainAppComponent}/>
                            {/* <Route exact path = '/admin' component={ AdminPanel } /> */}
                            <Route exact path = '/admin' render={() => store.getState().get('user').get('user').get('login') ? (<AdminPanel/>) : (<Redirect to='/signin'/>)} />
                            <Route path='/admin/parser' component={Parser}/>
                            <Route  path='/signup' component={Signup} />
                            <Route  path='/signin' component={Signin} />
                            <Route render={({location}) => <h2>{`no match for ${JSON.stringify(location)}`}</h2>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

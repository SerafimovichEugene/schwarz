import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { parse } from 'cookie';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import store from '../../../store/store';
import App from '../App/App';
import CantAcces from '../../presentational/CantAcces/CantAcces';
import MainAppComponent from '../MainAppComponentContainer/MainAppComponentContainer';
import Parser from '../../presentational/Parser/Parser';
import Signup from '../../presentational/Signup/Signup';
import Signin from '../../presentational/Signin/Signin.js';
import AdminPanel from '../AdminPanelContainer/AdminPanelContainer';
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
                            {/* <Route path='/catalog' component={Catalog}/> */}
                            <Route path='/admin' render={({location}) => {
                                const { canFetchUser, token } =  parse(document.cookie);
                                const isAdmin = store.getState().get('user').get('user').get('isAdmin');
                                if(canFetchUser ) {
                                    if(token) {
                                        if(location.pathname === '/admin/parser') {
                                            return (<Parser/>);
                                        }
                                        return (<AdminPanel/>);
                                    }
                                    return (<Redirect to='/'/>);
                                }
                                return (<Redirect to='/signin'/>)
                            }} />
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

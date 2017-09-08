import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { parse } from 'cookie';
import propTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import store from '../../../store/store';
import App from '../App/App';
import CantAcces from '../../presentational/CantAcces/CantAcces';
import MainAppComponent from '../MainAppComponentContainer/MainAppComponentContainer';
import Parser from '../../presentational/Parser/Parser';
import Catalog from '../../containers/CatalogContainer/CatalogContainer';
import Signup from '../../presentational/Signup/Signup';
import Signin from '../../presentational/Signin/Signin.js';
import AdminPanel from '../AdminPanelContainer/AdminPanelContainer';
import './root.scss';
//configurate material-ui ---------
import injectTapEventPlugin from 'react-tap-event-plugin';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
injectTapEventPlugin();
//---------------------------------

export default class Root extends Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route exact path='/' component={MainAppComponent}/>
                            <Route path='/catalog' render={({location}) => {
                                return <Catalog query={location.search} />
                            }}/>
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


Root.childContextTypes = {
    muiTheme: propTypes.object.isRequired,
};

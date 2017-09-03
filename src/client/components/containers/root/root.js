import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import store from '../../../store/store';
import SearchBar from '../../presentational/searchBar/seachBar';
import Parser from '../../presentational/Parser/Parser';
import Signup from '../../presentational/Signup/Signup';
import Signin from '../../presentational/Signin/Signin.js';

const Loc = ({location, match}) => {
    return (
        <div>
            <SearchBar/>
            <h2>
                {`ID: ${JSON.stringify(location)}, ${JSON.stringify(match)}`}
            </h2>
        </div>
    )
};
const WL = withRouter(Loc);

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
                            <Route exact path='/' component={SearchBar}/>
                            <Route exact path='/user/:id' component={WL} />
                            <Route path='/admin/parser' component={Parser}/>
                            <Route path='/signup' component={Signup} />
                            <Route path='/signin' component={Signin} />
                            <Route render={({location}) => <h2>{`no match for ${JSON.stringify(location)}`}</h2>} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

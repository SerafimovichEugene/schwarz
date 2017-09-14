import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { parse } from 'cookie';
import classNames from 'classnames';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import UserBar from '../../containers/UserBarContainer/UserBarContainer';
import './MainAppComponent.scss';

export default class MainAppComponent extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        const { fetchUser, user } = this.props;
        const { canFetchUser } =  parse(document.cookie);
        if(!user.login && canFetchUser) {
            fetchUser();
        }
    }

    render() {
        const { user } = this.props;
        return (
            <main>
                <Header user={user} />
                {/* <header>
                    <Link to='/catalog'>Catalog</Link>
                    {this.renderUserBar(user)}
                </header> */}
                {this.props.children}
                <Footer />
            </main>
        )
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import CardList from './CardList/CardList';
import FiltersBar from './FiltersBar/FiltersBar';
import { parseQuery } from '../../../../../build/utils/utils';
import './Catalog.scss';


const circularStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
}

export default class Catalog extends Component {

    static propTypes = {
        fetchProducts: PropTypes.any.isRequired,
        query: PropTypes.any.isRequired,
        isLoading: PropTypes.bool.isRequired,
        products: PropTypes.any.isRequired,
    }    

    constructor(props) {
        super(props);
        this.state = {
            query: '?count=15&currency=RUB',
        }
    }

    handlePageChange = (page) => {
        const { fetchProducts } = this.props;
        const query = this.state.query.concat(`&page=${page}`);
        fetchProducts(query);
        this.setState({
            currentPage: page,
            query,
        })
        console.log(this.state);
    }

    componentWillMount() {
        console.log('QUERY', parseQuery(this.props.query));
        const { fetchProducts } = this.props;
        // fetchProducts(`?count=15&price=1000&productType=${encodeURIComponent("Беговые дорожки")}`);
        fetchProducts(this.state.query);
    }

    renderCardList = () => {
        const { isLoading } = this.props;
        if(isLoading) {
            console.log('START FETCHING IS LOADING');
            return <CircularProgress size={80} style={circularStyle} />
        } 
        const { products } = this.props;
        if(products.data) {
            return <CardList
                currentPage={this.state.currentPage}
                onPageChange={this.handlePageChange}
                products={products.data}
                pages={products.pages} />
        }
        
    }
    render() {
        return (
            <MainAppComponent>
                <div className='catalog'>
                    <FiltersBar />
                    {this.renderCardList()}
                </div>
            </MainAppComponent>
        )
    }
}

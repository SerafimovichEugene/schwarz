import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Pagination from 'material-ui-pagination';
import CurrentFilters from './CurrentFilters/CurrentFilters';
import { Redirect } from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import MainAppComponent from '../../containers/MainAppComponentContainer/MainAppComponentContainer';
import CardList from './CardList/CardList';
import FiltersBar from './FiltersBar/FiltersBar';
import { parseQuery, updateQuery } from '../../../../../build/utils/utils';
import './Catalog.scss';


const circularStyle = {
    position: 'absolute',
    top: '5%',
    left: '50%',
}

const paginationStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px',
    borderTop: '1px solid #ddd',
}

export default class Catalog extends Component {

    static propTypes = {
        fetchProducts: PropTypes.any.isRequired,
        // query: PropTypes.any.isRequired,
        isLoading: PropTypes.bool.isRequired,
        products: PropTypes.any.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.location.search || '?count=15&page=1&currency=RUB',
        }
    }


    _handler = (value, type) => {
        const { fetchProducts, fetchProductsThrottle } = this.props;
        let query;
        if(type === 'page') {
            query = updateQuery(this.state.query, type, `${type}=${value}`);
        } else if(type === 'productType') {
            query = updateQuery(this.state.query, type, `${type}=${encodeURIComponent(value)}`);
            query = updateQuery(query, 'page', `page=1`);
        } else {
            query = updateQuery(this.state.query, type, `${type}=${value}`);
            query = updateQuery(query, 'page', `page=1`);
        }
        if(type === 'priceFrom' || type === 'priceTo') {
            fetchProductsThrottle(query);
        } else {
            fetchProducts(query);
        }
        if(type === 'page') {
            this.setState({
                currentPage: value,
                query,
            });
        } else if(type === 'priceFrom') {
            this.setState({
                currentPage: 1,
                priceFrom: +value,
                query,
            });
        } else if(type === 'priceTo') {
            this.setState({
                currentPage: 1,
                priceTo: +value,
                query,
            });
        } else if(type === 'productType') {
            this.setState({
                currentPage: 1,
                productType: value,
                query,
            });
        } else if(type === 'currency') {
            this.setState({
                currentPage: 1,
                currentCurrency: value,
                query,
            })
        }
        this.props.history.push(`/catalog${query}`);
    }

    handleCurrencyFilterChange = (value) => {
        this._handler(value, 'currency');
    }

    handlePageChange = (page) => {
        this._handler(page, 'page');
    }

    handlePriceFromChange = (value) => {
        console.log('PRICE FROM CHANGE', this.state);
        this._handler(+value, 'priceFrom');
    }

    handlePriceToChange = (value) => {
        console.log('PRICE TO CHANGE', value);
        this._handler(+value, 'priceTo');
    }

    handleTypeChange = (value) => {
        this._handler(value, 'productType');
    }

    componentWillMount() {
        const queryObject = parseQuery(this.state.query);
        this.setState({
            currentPage: queryObject.page,
            currentCurrency: queryObject.currency,
            priceFrom: queryObject.priceFrom && +queryObject.priceFrom,
            priceTo: (queryObject.priceTo && queryObject.priceTo !== 'Infinity' && +queryObject.priceTo) || '',
            productType: queryObject.productType,
        });
        this.props.history.push(`/catalog${this.state.query}`);
        const { fetchProducts } = this.props;
        fetchProducts(this.state.query);
    }


    visualizeData = () => {
        const { isLoading } = this.props;
        if(isLoading) {
            console.log('START FETCHING IS LOADING');
            return <CircularProgress size={80} style={circularStyle} />
        }
        const { products } = this.props;
        let { currentCurrency, priceFrom, priceTo, productType } = this.state;
        const filters = { currentCurrency, priceFrom, priceTo, productType } ;
        if(products.data) {
            return <div className='catalog-inner'>
                <CurrentFilters filters={filters} />
                {this.renderCardList(products)}
                {this.showPagination(products)}
            </div>
        }
    }

    renderCardList = (products) => {
        return <CardList
            products={products.data}
        />
    }


    calculateHowMuchToDisplay = (products) => {
        let { pages } = products;
        if(pages <= 1) return 0;
        if(pages <= 15) return pages;
        else return 15;
    }

    showPagination = (products) => {
        if(products.pages >= +this.state.currentPage ) {
            return (<Pagination
                styleRoot={paginationStyle}
                onChange={this.handlePageChange}
                total={products.pages}
                current={+this.state.currentPage}
                display={this.calculateHowMuchToDisplay(products)} />)
        }
    }

    render() {
        return (
            <MainAppComponent>
                <div className='catalog'>
                    <FiltersBar
                        onTypeChange={this.handleTypeChange}
                        priceFrom={this.state.priceFrom}
                        priceTo={this.state.priceTo}
                        onPriceToChange={throttle(this.handlePriceToChange, 2000)}
                        onPriceFromChange={throttle(this.handlePriceFromChange, 2000)}
                        currentCurrency={this.state.currentCurrency}
                        onCurrencyFilterChange={this.handleCurrencyFilterChange}
                    />
                    {this.visualizeData()}
                </div>
            </MainAppComponent>
        )
    }
}

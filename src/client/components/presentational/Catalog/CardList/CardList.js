import React, { Component } from 'react';
import Pagination from 'material-ui-pagination';
import Card from './Card/Card';
import './CardList.scss';

const stylePaginationRoot = {
    width: '100%',
    margin: '0 auto',
}

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    calculateHowMuchToDisplay = () => {
        let { pages } = this.props;
        if(pages <= 1) return 0;
        if(pages <= 15) return pages;
        else return 15;
    }

    handleChange = (page) => {
        // this.setState({
        //     currentPage: page,
        // });
        this.props.onPageChange(page);
    }

    render() {
        const { products } = this.props;
        return (
            <div className='card-list'>
                {
                    products.map(product => {
                        return <Card key={product.name} product={product} />
                    })
                }
                <Pagination
                    onChange={this.handleChange}
                    total={this.props.pages}
                    current={this.props.currentPage}
                    display={this.calculateHowMuchToDisplay()} />
            </div>
        )
    }
}

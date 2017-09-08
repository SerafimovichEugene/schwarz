import React, { Component } from 'react';
import range from 'lodash/range';
import './Pagination.scss';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialCurrentPage: 1,
            currentPage: 1,
        };
    }

    componentWillMount() {
        this.setPage(this.state.initialCurrentPage);
    }

    setPage = (page) => {
        let { allPages } = this.props;
        this.setState({
            currentPage: page,
        });
        this.calculate(allPages);
        //do some hadler here also
    }

    calculate(allPages) {
        let startPage;
        let endPage;
        if (allPages <= 10) {
            startPage = 1;
            endPage = allPages;
        } else {
            if (this.state.currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (this.state.currentPage + 4 >= allPages) {
                startPage = allPages - 9;
                endPage = allPages;
            } else {
                startPage = this.state.currentPage - 5;
                endPage = this.state.currentPage + 4;
            }
        }
        let pagesArray = range(1, allPages + 1);
        this.setState({
            endPage,
            startPage,
            pagesArray,
        });
    }

    render() {
        const { allPages } = this.props;
        if (!allPages || allPages.length <= 1) {
            return null;
        }
        return (
            <div className="pagination">
                <div className={this.state.currentPage === 1 ? 'disabled first' : 'first'}
                    onClick={() => this.setPage(1)}
                    >
                    First
                </div>
                <div className={this.state.currentPage === 1 ? 'disabled' : ''}
                    onClick={() => this.setPage(this.state.currentPage - 1)}
                    >
                    Previous
                </div>
                {this.state.pagesArray.map((page, index) =>
                    <div key={index} className={this.state.currentPage === page ? 'active' : ''}
                        onClick={() => this.setPage(page)}
                        >
                        {page}
                    </div>
                )}
                <div className={this.state.currentPage === allPages ? 'disabled' : ''}
                    onClick={(e) => this.setPage(this.state.currentPage + 1)}
                    >
                    Next
                </div>
                <div className={this.state.currentPage === allPages ? 'disabled' : ''}
                    onClick={() => this.setPage(allPages)}
                    >
                    Last
                </div>
            </div>
        );
    }
}

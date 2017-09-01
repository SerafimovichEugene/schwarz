import React, { Component } from 'react';
import classNames from 'classnames';
import './DragAndDrop.scss';
export default class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDragged: false,
        }
    }

    handleDragEnter = (e) => {
        this.handleDragOver(e);
        this.setState({
            isDragged: true
        });
    }

    handleDragLeave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isDragged: false,
        });
    }

    handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isDragged: false,
        });
        this.props.parserHandleDrop(e, 'drop');
    }

    render() {
        let dropClasses = classNames({
            drop: true,
            default: !this.state.isDragged,
            dragged: this.state.isDragged
        });
        return (
            <div
                className={dropClasses}
                onDragEnter={this.handleDragEnter}
                onDragOver={this.handleDragOver}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                >Drop .xlsx file here</div>
        )
    }
}

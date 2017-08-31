import React, { Component } from 'react';

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
}

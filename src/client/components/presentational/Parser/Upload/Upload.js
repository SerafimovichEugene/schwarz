import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import './Upload.scss';
export default class Upload extends Component {
    constructor(props) {
        super(props);
    }


    handleChange = (e) => {
        this.props.handleChangeParser(e, 'change');
        e.target.value = null;
    }

    render() {
        const uploadClasses = classNames({
            'custom-file-upload': true,
        });
        return (
            <div>
                <label
                    htmlFor="xlsxfile"
                    className={uploadClasses} >
                    <FontAwesome
                        name='cloud-download'
                        size='2x'
                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
                </label>
                <input
                    onChange={this.handleChange}
                    type='file'
                    id='xlsxfile'/>
            </div>
        )
    }
}

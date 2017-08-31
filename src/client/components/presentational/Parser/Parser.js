import React, { Component } from 'react';
import XLSX from 'xlsx';
import classNames from 'classnames';
import Overlay from './Overlay/Overlay';
import './Parser.scss';

const XW = {
	msg: 'xlsx',
	worker: '/js/xlsx/xlsxworker.js'
};
XLSX.XW = XW;


class Parser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // isDragged: false,
			isLoading: false,
			loadingFail: false,
			isLoadingComplete: false,
        }
    }

    // handleDragEnter = (e) => {
    //     this.handleDragOver(e);
    //     this.setState({
    //         isDragged: true
    //     });
    // }
	//
    // handleDragLeave = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     this.setState({
    //         isDragged: false,
    //     });
    // }
	//
    // handleDragOver = (e) => {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     e.dataTransfer.dropEffect = 'copy';
    // }

    _toJson = (workbook) => {
        const result = {};
        workbook.SheetNames.forEach((sheetName) => {
            const row = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if(row.length > 0) {
                result[sheetName] = row;
            }
        });
        this.setState({
            wb: result,
			isLoading: false,
			isLoadingComplete: true,
        });
		setTimeout(() => {
			this.setState({
				isLoadingComplete: false,
			});
		}, 0)
        return result;
    }

	_load = (files) => {
		for(let i = 0, f = files[i]; i != files.length; ++i) {
            const reader = new FileReader();
            reader.onprogress = (e) => {
            }
            reader.onloadend = (e) => {
                let data = e.target.result;
                const xw = (data, cb) => {
		            const worker = new Worker(XLSX.XW.worker);
            		worker.onmessage = (e) => {
            			switch(e.data.t) {
            				case 'ready': break;
            				case 'e': {
								console.error('ERROR web worker', e.data.d);
								setTimeout(() => {
									this.setState({
										isLoading: false,
										loadingFail: false,
									});
								}, 0);
								this.setState({
									loadingFail: true,
								});
								break;
							};
            				case XLSX.XW.msg: cb(JSON.parse(e.data.d)); break;
            			}
            		};
            		worker.postMessage({d: data, b: 'binary'});
            	};
                xw(data, this._toJson);
            }
            reader.readAsBinaryString(f);
        }
	}

    handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            isDragged: false,
			isLoading: true,
			loadingFail: false
        });
        let files = e.dataTransfer.files;
		this._load(files);
        // for(let i = 0, f = files[i]; i != files.length; ++i) {
        //     const reader = new FileReader();
        //     reader.onprogress = (e) => {
        //     }
        //     reader.onloadend = (e) => {
        //         let data = e.target.result;
        //         const xw = (data, cb) => {
		//             const worker = new Worker(XLSX.XW.worker);
        //     		worker.onmessage = (e) => {
        //     			switch(e.data.t) {
        //     				case 'ready': break;
        //     				case 'e': {
		// 						console.error('ERROR web worker', e.data.d);
		// 						setTimeout(() => {
		// 							this.setState({
		// 								isLoading: false,
		// 								loadingFail: false,
		// 							});
		// 						}, 0);
		// 						this.setState({
		// 							loadingFail: true,
		// 						});
		// 						break;
		// 					};
        //     				case XLSX.XW.msg: cb(JSON.parse(e.data.d)); break;
        //     			}
        //     		};
        //     		worker.postMessage({d: data, b: 'binary'});
        //     	};
        //         xw(data, this._toJson);
        //     }
        //     reader.readAsBinaryString(f);
        // }
    }

    render() {
        let dropClasses = classNames({
            drop: true,
            default: !this.state.isDragged,
            dragged: this.state.isDragged
        });
        let wrapperClasses = classNames({
            wrapper: true,
        });
        return (
            <div className={wrapperClasses}>
                <div
                    className={dropClasses}
                    onDragEnter={this.handleDragEnter}
                    onDragOver={this.handleDragOver}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.handleDrop}
                    >Drop .xlsx file here</div>
				<Overlay
					show={this.state.isLoading}
					fail={this.state.loadingFail}
					complete={this.state.isLoadingComplete}
					>{
						this.state.isLoading ? 'Loading...' : 'fail to load'
					}
					</Overlay>
					<div>{JSON.stringify(this.state.wb)}</div>
            </div>
        )
    }
}

export default Parser;

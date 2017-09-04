import React, { Component } from 'react';
import XLSX from 'xlsx';
import classNames from 'classnames';
import { addProductsDocument, updateProducts } from '../../../services/products';
import AdminPanel from '../AdminPanel/AdminPanel';
import Overlay from './Overlay/Overlay';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import Upload from './Upload/Upload';
import './Parser.scss';

const XW = {
	msg: 'xlsx',
	worker: '/js/xlsx/xlsxworker.js'
};
XLSX.XW = XW;

export default class Parser extends Component {
    constructor(props) {
        super(props);
        this.state = {
			isLoading: false,
			loadingFail: false,
			isLoadingComplete: false,
        }
    }
    _toJson = async (workbook) => {
        const result = {};
        workbook.SheetNames.forEach((sheetName) => {
            const row = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            if(row.length > 0) {
                result[sheetName] = row;
            }
        });
		await updateProducts(result);
		await addProductsDocument(workbook);
        this.setState({
            wb: result,
			isLoading: false,
			isLoadingComplete: true,
        });
		setTimeout(() => {
			this.setState({
				isLoadingComplete: false,
			});
		}, 0);
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

	handleUpload = (e, type) => {
		e.stopPropagation();
        e.preventDefault();
        this.setState({
			isLoading: true,
			loadingFail: false
        });
		let files = null;
		if(type === 'drop') {
			files = e.dataTransfer.files;
		} else if(type === 'change') {
			files = e.target.files;
		}
		this._load(files);
	}

    render() {
        let wrapperClasses = classNames({
            wrapper: true,
        });
        return (
			<AdminPanel>
				<div className={wrapperClasses}>
					<DragAndDrop parserHandleDrop={this.handleUpload}/>
					<Upload handleChangeParser={this.handleUpload} />
					<Overlay
						show={this.state.isLoading}
						fail={this.state.loadingFail}
						complete={this.state.isLoadingComplete} >
						{ this.state.isLoading ? 'Loading...' : 'fail to load' }
					</Overlay>
					<div>{JSON.stringify(this.state.wb)}</div>
				</div>
			</AdminPanel>
        )
    }
}

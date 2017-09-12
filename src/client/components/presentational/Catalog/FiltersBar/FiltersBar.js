import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import { getDistinctProductTypes } from '../../../../services/products';
import './FiltersBar.scss';

const styles = {
    radioButton: {
        marginBottom: '16px',
    },
}

export default class FiltersBar extends Component {
    static propTypes = {
        onCurrencyFilterChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            dropdownValue: 1,
            distinct: null,
            isDistinctLoading: true,
            isCorrectToPrice: false,
            isCorrectFromPrice: false,
        }
    }


    componentWillMount() {
        getDistinctProductTypes().then(distinct => {
            console.log(distinct);
            this.setState({
                distinct,
                isDistinctLoading: false,
            })
        })
    }

    handleRadioButtonGroupChange = (event, value) => {
        this.props.onCurrencyFilterChange(value);
    }

    handleTypeChange = (event) => {
        event.stopPropagation();
        this.props.onTypeChange(event.target.innerText.trim());
    }

    produceTypes = () => {
        if(!this.state.isDistinctLoading) {
            return this.state.distinct.map((type, i) => {
                return <ListItem
                    onTouchTap={this.handleTypeChange}
                    key={i}
                    primaryText={type}
                />
            })
        }
    }

    isInProgress = () => {
        if(this.state.isDistinctLoading) {
            return (
                <div className='circular-progress-wrapper'>
                    <CircularProgress key={1} size={80} thickness={5}/>
                </div>
            );
        }
    }


    handleDropDownChange = (event, index, dropdownValue) => {
        this.setState({dropdownValue});
    }

    _checkValid = (type, value,  cb) => {
        if(isNaN(+value) || value === '') {
            this.setState({
                [type]: true,
            });
            if(value === '') {
                setTimeout(() => {
                    this.setState({
                        [type]: false,
                    })
                }, 900);
            }
            type === 'isCorrectFromPrice' ? cb(0) : cb(Infinity);
        } else {
            this.setState({
                [type]: false,
            });
            cb(value);
        }
    }

    handlePriceFromChange = (event, newValue) => {
        this._checkValid('isCorrectFromPrice', newValue, this.props.onPriceFromChange);
    }

    handlePriceToChange = (event, newValue) => {
        this._checkValid('isCorrectToPrice', newValue, this.props.onPriceToChange);

    }

    handleBlur = () => {
        console.log('BLURRRRR');
    }

    render() {
        return (
            <div className='filters-bar'>
                <List>
                    <ListItem
                        primaryText="Currency"
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={[
                            <ListItem
                                key={1}
                                children={
                                    <RadioButtonGroup
                                        onChange={this.handleRadioButtonGroupChange}
                                        key={1}
                                        name="currency"
                                        defaultSelected={this.props.currentCurrency}>
                                        <RadioButton
                                            value="USD"
                                            label="USD"
                                            style={styles.radioButton}
                                        />
                                        <RadioButton
                                            value="RUB"
                                            label="RUB"
                                            style={styles.radioButton}
                                        />
                                    </RadioButtonGroup>
                                }
                            />,
                        ]}
                    />
                    <ListItem
                        primaryText='Price'
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={
                            [
                                <ListItem
                                    key={1}
                                    children={
                                        <div key={1}>
                                            <TextField
                                                defaultValue={this.props.priceFrom}
                                                errorText={this.state.isCorrectFromPrice && 'must be number' }
                                                onChange={this.handlePriceFromChange}
                                                hintText="price from"
                                                floatingLabelText="price from"
                                            />
                                            <TextField
                                                defaultValue={this.props.priceTo}
                                                errorText={this.state.isCorrectToPrice && 'must be number' }
                                                onChange={this.handlePriceToChange}
                                                hintText="price to"
                                                floatingLabelText="price to"
                                            />
                                        </div>
                                    }
                                />,
                            ]
                        }

                    />
                    {this.isInProgress()}
                    <ListItem
                        primaryText='Product type'
                        initiallyOpen={true}
                        primaryTogglesNestedList={true}
                        nestedItems={
                            // [
                            // <div key={1}>
                            this.produceTypes()
                            // </div>
                            // ]
                        }
                    />

                </List>

            </div>
        )
    }
}

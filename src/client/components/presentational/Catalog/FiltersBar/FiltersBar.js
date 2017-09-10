import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
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
    constructor(props) {
        super(props);
        this.state = {
            dropdownValue: 1,
            distinct: null,
            isDistinctLoading: true,
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


    produceTypes = () => {
        if(!this.state.isDistinctLoading) {
            return this.state.distinct.map((type, i) => {
                return <ListItem
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
                                    <RadioButtonGroup key={1} name="shipSpeed" defaultSelected="not_light">
                                        <RadioButton
                                            value="light"
                                            label="USD"
                                            style={styles.radioButton}
                                        />
                                        <RadioButton
                                            value="not_light"
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
                                                hintText="price from"
                                                floatingLabelText="price from"
                                            />
                                            <TextField
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

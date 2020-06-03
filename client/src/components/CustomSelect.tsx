import React from 'react';
import Select, { components } from 'react-select';
import styled from 'styled-components';
import { rgba } from 'polished';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { selectTheme } from '../theme';
import { User } from '../types.js';


const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];


const CustomSelect = (props: any, state: any) => {
    const handleChange = (item: any) => {
        props.onSelectionChange(item.value);
        
        
    };
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20,

        }),
        control: (provided: any) => ({
            ...provided,
            minHeight: '23px',
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: state.isFocused ? 0 : 0,
                borderBottom: `1px solid ${rgba(selectTheme.black, 0.55)}`,
            },
            borderBottom: `1px solid ${rgba(selectTheme.black, 0.55)}`,
            borderRadius: 0,
            marginBottom: '12px',
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            '& svg': { display: 'none' },
        }),
        indicatorSeparator: () => ({}),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: 0,
            marginBottom: '5px',
            fontFamily: `ProximaNovaMedium`,
            height: '23px',
            fontSize: '16px',
            alignItem: 'center',
        }),
        placeholder: (provided: any) => ({
            ...provided,
            margin: 0,
            padding: 0,
            paddingLeft: '2px',
            fontSize: '16px',
            
        }),
        input: (provided: any) => ({
            ...provided,
            padding: 0,
            paddingLeft: '2px',
            margin: 0,
            fontFamily: 'ProximaNovaMedium',
            fontSize: '16px',
         
        })
    };
    return (
        <>
            <Select
                styles={customStyles}
                options={colourOptions}
                placeholder="Enter member's name"
                isSearchable
                onChange={handleChange}
                value={null}
            />
        </>
    );
};

export default CustomSelect;

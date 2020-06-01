import React, { useState } from 'react';
import ReactSelect from 'react-select';
import Select from 'react-select';
import styled from 'styled-components';
import { rgba } from 'polished';
import gql from 'graphql-tag';

import { selectTheme } from '../theme';

// import { Query, QueryResult } from 'react-apollo';
// import { useQuery } from '@apollo/react-hooks';

// import { User } from '../types.js';

const USERS_QUERY = gql`
    {
        getAllUsers {
            _id
            name
        }
    }
`;
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
        props.onSelectionChange(item.value)
    };
    const boardMembers = props.selectedItems;
    const customStyles = {
        option: (provided: any, state: any) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20,
        }),
        control: (provided: any) => ({
            ...provided,
            border: state.isFocused ? 0 : 0,
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            '&:hover': {
                border: state.isFocused ? 0 : 0,
                borderBottom: `1px solid ${rgba(selectTheme.black, 0.55)}`,
            },
            borderBottom: `1px solid ${rgba(selectTheme.black, 0.55)}`,
            borderRadius: 0,
        }),
        dropdownIndicator: (provided: any) => ({
            ...provided,
            '& svg': { display: 'none' },
        }),
        indicatorSeparator: () => ({}),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: 0,
            fontFamily: `ProximaNovaMedium`,
            opacity: 0.55,
            fontSize: '11px',
        }),
        indicatorsContainer: (provided: any) => ({
            ...provided,
            opacity: 0.55,
        }),
        placeholder: (provided: any) => ({
            ...provided,
            fontSize: '11px',
        }),
    };
    return (
        <>
            {/* <MultiSelect multi {...props} /> */}
            <Select
                styles={customStyles}
                options={colourOptions}
                placeholder="Enter member's name"
                // isMulti
                isSearchable
                onChange={handleChange}
                value= {boardMembers}
            />
            <MemberList>
                {boardMembers.map((item: any, index: any) => (
                    <Member key={index}>{item}</Member>
                ))}
            </MemberList>
        </>
    );
};

export default CustomSelect;
// const MultiSelect = styled(ReactSelect)`
//     &.Select--multi {
//         .Select-value {
//             display: inline-flex;
//             align-items: center;
//         }
//     }

//     & .Select-placeholder {
//         font-size: smaller;
//     }
// `;
const MemberList = styled.div`
    display: flex;
`;
const Member = styled.div`
    margin-right: 5px;
`;

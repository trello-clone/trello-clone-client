import React, { useState } from 'react';
import Select from 'react-select';
import { rgba } from 'polished';
import { useQuery } from '@apollo/react-hooks';

import { selectTheme } from '../../theme';
import { User } from '../../types';
import { GET_USERS } from '../../graphql/queries';

const CustomSelect = (props: any, state: any) => {
    const [keywordSearching, setKeyWordSearching] = useState('');
    const [memberOptions, setMemberOptions] = useState([]);
    const { data, loading } = useQuery(GET_USERS, {
        variables: { keyword: keywordSearching },
    });

    const handleInputChange = (input: string) => {
        if (input !== '') {
            setKeyWordSearching(input);
        }
        if (!loading && data) {
            setMemberOptions(data.users);
        }
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
                borderBottom: `1px solid ${rgba(selectTheme.black, 0.25)}`,
            },
            borderBottom: `1px solid ${rgba(selectTheme.black, 0.25)}`,
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
            color: ` ${rgba(selectTheme.black, 0.25)}`,
        }),
        input: (provided: any) => ({
            ...provided,
            padding: 0,
            paddingLeft: '2px',
            margin: 0,
            fontFamily: 'ProximaNovaMedium',
            fontSize: '16px',
        }),
    };
    return (
        <>
            <Select
                styles={customStyles}
                options={memberOptions}
                getOptionLabel={(option: User) => `${option.name}`}
                // getOptionValue={(option)=>`${option.name}`}
                placeholder="Enter member's name"
                isSearchable
                onChange={(item) => props.selectItems(item)}
                value={null}
                onInputChange={handleInputChange}
            />
        </>
    );
};

export default CustomSelect;

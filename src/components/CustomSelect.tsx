import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { rgba } from 'polished';
import { useLazyQuery } from '@apollo/react-hooks';

import { selectTheme } from '../theme';
import { User } from '../types';
import { GET_USERS } from '../graphql/queries';
import { useDebounce } from '../utils/index';

const CustomSelect = (props: any, state: any) => {
  // State and setter for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State and setter for search results
  const [results, setResults] = useState<[User] | undefined>();
  // State for search status (whether there is a pending API request)
  const [isSearching, setIsSearching] = useState(false);

  // Now we call our hook, passing in the current searchTerm value.
  // The hook will only return the latest value (what we passed in) ...
  // ... if it's been more than 500ms since it was last called.
  // Otherwise, it will return the previous value of searchTerm.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [getUsers, { data, loading }] = useLazyQuery<{ users: [User] }, { keyword: string }>(GET_USERS);

  useEffect(() => {
    // Make sure we have a value (user has entered something in input)
    if (debouncedSearchTerm) {
      // Set isSearching state
      setIsSearching(true);
      // Fire off our API call
      getUsers({ variables: { keyword: debouncedSearchTerm } });
      if (!loading && data) {
        // Set back to false since request finished
        setIsSearching(false);
        // Set results state
        setResults(data.users);
      }
    } else {
      setResults(undefined);
    }
  }, [data, debouncedSearchTerm, getUsers, loading]);

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'red' : `${selectTheme.black}`,
      fontFamily: `ProximaNovaSemiBold`,
      padding: '16px 0',
      paddingLeft: '20%',
      fontSize: '14px',
    }),
    control: (provided: any) => ({
      ...provided,
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      border: 0,
      borderRadius: '8px',
      marginBottom: '12px',
      backgroundColor: `${rgba(selectTheme.blue, 0.1)}`,
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
      fontSize: '14px',
      alignItem: 'center',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      margin: 0,
      padding: 0,
      paddingLeft: '12px',
      fontSize: '14px',
      fontFamily: 'ProximaNovaMedium',
      color: ` ${rgba(selectTheme.black, 0.25)}`,
    }),
    input: (provided: any) => ({
      ...provided,
      paddingLeft: '12px',
      margin: 0,
      fontFamily: 'ProximaNovaMedium',
      fontSize: '14px',
    }),
  };
  return (
    <>
      <Select
        styles={customStyles}
        options={results}
        getOptionLabel={(option: User) => `${option.name}`}
        // getOptionValue={(option)=>`${option.name}`}
        placeholder="Search member"
        isSearchable
        /* get the selected items */
        onChange={(item) => props.selectItems(item)}
        value={null}
        onInputChange={(input) => setSearchTerm(input)}
      />
    </>
  );
};

export default CustomSelect;

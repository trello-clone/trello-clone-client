import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import { useMutation } from 'react-apollo';

import { CREATE_LIST } from '../../graphql/mutations';
import { Column } from '../../types';
import { useOnClickOutside } from 'utils';

interface AddColumnProps {
    onColumnAdded: (column_id?: string) => void;
    boardId: string;
}

const AddColumn = (props: AddColumnProps) => {
    const componentRef = useRef<HTMLFormElement>(null);

    // a flag to show input placeholder based on its focus state
    const [isAddingColumn, setIsAddingColumn] = useState(false);

    const [title, setTitle] = useState('');

    // Graphql mutation to create a new list/column
    const [gqlCreateList] = useMutation<{ createList: Column }, { board_id: string; title: string }>(CREATE_LIST);

    const startAddingColumn = () => setIsAddingColumn(true);
    const cancelAddingColumn = () => setIsAddingColumn(false);
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const createList = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.length) {
            gqlCreateList({ variables: { board_id: props.boardId, title } }).then((res) => {
                props.onColumnAdded(res.data?.createList._id);
                cancelAddingColumn();
            });
        }
    };

    useOnClickOutside(componentRef, cancelAddingColumn);

    useEffect(() => {
        // reset input value
        setTitle('');
    }, [isAddingColumn]);

    return (
        <AddColumnWrapper ref={componentRef} onSubmit={createList}>
            <AddInput
                placeholder={isAddingColumn ? 'Enter list title' : 'Add a list'}
                onFocus={startAddingColumn}
                value={title}
                onChange={onTitleChange}
            />
            {isAddingColumn && (
                <ActionsWrapper>
                    <AddButton>Add list</AddButton>
                    <CancelButton onClick={cancelAddingColumn}>Cancel</CancelButton>
                </ActionsWrapper>
            )}
        </AddColumnWrapper>
    );
};

const AddColumnWrapper = styled.form`
    display: inline-block;
    vertical-align: top;
    width: calc(100vw / 5);
    margin-right: 24px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.colors.light_blue};
    padding: 16px;
    position: relative;
`;

export const AddInput = styled.input`
    background: transparent;
    border: none;
    color: ${(props) => rgba(props.theme.colors.black, 0.4)};
    font-size: 14px;
    outline: none;
    width: 100%;
`;

export const ActionsWrapper = styled.div`
    margin-top: 8px;
`;

export const AddButton = styled.button`
    background-color: ${(props) => props.theme.colors.lemon};
    border: none;
    border-radius: 4px;
    box-shadow: 0 1.5px 4px 0px rgba(0, 0, 0, 0.08);
    color: ${(props) => props.theme.colors.white};
    cursor: pointer;
    display: inline-block;
    margin-right: 8px;
    outline: none;
    padding: 8px;
    vertical-align: middle;
`;

export const CancelButton = styled.button`
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.dark_blue};
    cursor: pointer;
    display: inline-block;
    padding: 8px;
    outline: none;
    vertical-align: middle;
`;

export default AddColumn;

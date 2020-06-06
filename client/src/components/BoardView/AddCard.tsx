import React, { useRef, useState, ChangeEvent, FormEvent, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

import { AddInput, ActionsWrapper, AddButton, CancelButton } from './AddColumn';
import { useMutation } from 'react-apollo';
import { Card } from 'types';
import { CREATE_CARD } from 'graphql/mutations';
import { useOnClickOutside } from 'utils';
import BoardViewContext from 'contexts/BoardViewContext';

interface AddCardProps {
    columnId: string;
}

const AddCard = (props: AddCardProps) => {
    const componentRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // a flag to show input placeholder based on its focus state
    const [isAddingCard, setIsAddingCard] = useState(false);

    const [title, setTitle] = useState('');

    // Graphql mutation to create a new card
    const [gqlCreateCard] = useMutation<{ createCard: Card }, { title: string }>(CREATE_CARD);

    const boardViewContext = useContext(BoardViewContext);

    const startAddingCard = () => setIsAddingCard(true);
    const cancelAddingCard = () => setIsAddingCard(false);
    const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const createCard = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (title.length) {
            gqlCreateCard({ variables: { title } }).then((res) => {
                if (boardViewContext.onCardAdded) {
                    boardViewContext.onCardAdded(props.columnId, res.data?.createCard);
                }
                cancelAddingCard();
                setTitle('');
            });
        }
    };

    useOnClickOutside(componentRef, cancelAddingCard);

    useEffect(() => {
        // force focus on input after the placeholder is clicked
        if (inputRef.current && isAddingCard) {
            inputRef.current.focus();
        }

        // reset input value
        setTitle('');
    }, [isAddingCard]);

    return (
        <AddCardWrapper ref={componentRef} onSubmit={createCard}>
            {isAddingCard ? (
                <>
                    <AddInput placeholder="Enter card title" value={title} onChange={onTitleChange} ref={inputRef} />
                    <ActionsWrapper>
                        <AddButton>Add card</AddButton>
                        <CancelButton onClick={cancelAddingCard}>Cancel</CancelButton>
                    </ActionsWrapper>
                </>
            ) : (
                <Placeholder onClick={startAddingCard}>
                    Add a card <PlusIcon>+</PlusIcon>
                </Placeholder>
            )}
        </AddCardWrapper>
    );
};

const AddCardWrapper = styled.form`
    margin-top: 16px;
    width: 100%;
`;

const Placeholder = styled.div`
    color: ${(props) => rgba(props.theme.colors.black, 0.4)};
    cursor: pointer;
    font-size: 14px;
    height: 100%;
`;

const PlusIcon = styled.span`
    font-size: 18px;
    margin-left: 4px;
    vertical-align: middle;
`;

export default AddCard;

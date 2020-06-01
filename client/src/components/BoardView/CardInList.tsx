import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from '../../types';

interface CardProps {
    data: Card;
}

const CardInList = (props: CardProps) => {
    const { _id, title, index } = props.data;
    return (
        <Draggable draggableId={_id} index={index}>
            {(provided) => (
                <Container {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    {title}
                    <br />
                    {index}
                </Container>
            )}
        </Draggable>
    );
};

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 4px;
    padding: 16px;
    margin-bottom: 8px;
`;

export default CardInList;
import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { rgba } from 'polished';

import { Column as ColumnT } from '../../types';
import CardInList from './CardInList';

interface ColumnProps {
    data: ColumnT;
}

const Column = (props: ColumnProps) => {
    const { data } = props;
    return (
        <Draggable draggableId={data._id} index={data.index}>
            {(provided) => (
                <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <ColumnName {...provided.dragHandleProps}>{data.title} ({data.cards.length})</ColumnName>
                    <Droppable droppableId={data._id} type="card">
                        {(provided) => (
                            <CardsList ref={provided.innerRef} {...provided.droppableProps}>
                                {data.cards.map((card) => (
                                    <CardInList key={card._id} data={card} />
                                ))}
                                {provided.placeholder}
                            </CardsList>
                        )}
                    </Droppable>
                </ColumnContainer>
            )}
        </Draggable>
    );
};

const ColumnContainer = styled.div`
    display: inline-block;
    height: 100%;
    width: calc(100vw / 5);
    margin-right: 24px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.light_blue};
    padding: 16px;
    position: relative;
`;

const ColumnName = styled.label`
    color: ${props => rgba(props.theme.colors.black, 0.4)};
    font-size: 14px;
    width: 100%;
    outline: none;
    padding-bottom: 24px;
    display: block;
`;

const CardsList = styled.div`
    background-image: linear-gradient(rgba(#ffffff, 0.7), rgba(#ffffff, 0));
    flex: 0 1 100%;
    height: 100%;
`;

export default Column;

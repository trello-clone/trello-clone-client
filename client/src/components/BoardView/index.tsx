import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { DragDropContext, DraggingStyle, NotDraggingStyle, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Column from './Column';
import { Column as ColumnT } from '../../types';

const testColumns: ColumnT[] = [
    {
        _id: '5ecd89ea1b6cb2770001872e',
        title: 'First list',
        board_id: '5ec440901b6cb2770001010b',
        index: 0,
        cards: [
            {
                _id: '5ecd92cf1b6cb277000187ab',
                title: 'First card',
                description: 'The very first card ever created in the first list of the first board in the first team',
                index: 0,
            },
            {
                _id: '23v4ur876c44563y7000187ab',
                title: 'Second card',
                description: 'The second card, no more special...',
                index: 1,
            },
        ],
    },
    {
        _id: '34sgfh9edgf78rwetqwer781872e',
        title: 'Second list',
        board_id: '5ec440901b6cb2770001010b',
        index: 1,
        cards: [],
    },
];

interface BoardViewProps {}

const BoardView = (props: BoardViewProps) => {
    const match = useRouteMatch<{ board_id: string }>();
    const [columns, setColumns] = useState(testColumns);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'column') {
            let newColumns = [...columns];
            const movedColumn = newColumns.splice(source.index, 1)[0];
            newColumns.splice(destination.index, 0, movedColumn);
            newColumns = newColumns.map((item, index) => ({ ...item, index }));
            setColumns(newColumns);
            return;
        }

        const sourceColumn = columns.find((item) => item._id === source.droppableId);
        const destinationColumn = columns.find((item) => item._id === destination.droppableId);
        if (!sourceColumn || !destinationColumn) {
            return;
        }

        // item moves within the same list
        if (sourceColumn === destinationColumn) {
            const cardsInColumn = [...sourceColumn.cards];
            const movedCard = cardsInColumn.splice(source.index, 1)[0];
            cardsInColumn.splice(destination.index, 0, movedCard);
            const newColumn: ColumnT = {
                ...sourceColumn,
                cards: cardsInColumn.map((card, index) => ({ ...card, index })),
            };

            setColumns(
                columns.map((item) => {
                    if (item._id === newColumn._id) {
                        return newColumn;
                    }
                    return item;
                })
            );
            return;
        }

        // item moves from one list to another
        const cardsInSourceColumn = [...sourceColumn.cards];
        const movedCard = cardsInSourceColumn.splice(source.index, 1)[0];
        const newSourceColumn: ColumnT = {
            ...sourceColumn,
            cards: cardsInSourceColumn.map((card, index) => ({ ...card, index })),
        };

        const cardsInDestinationColumn = [...destinationColumn.cards];
        cardsInDestinationColumn.splice(destination.index, 0, { ...movedCard, index: destination.index });
        const newDestinationColumn: ColumnT = {
            ...destinationColumn,
            cards: cardsInDestinationColumn.map((card, index) => ({ ...card, index })),
        };
        setColumns(
            columns.map((item) => {
                if (item._id === newSourceColumn._id) {
                    return newSourceColumn;
                }
                if (item._id === newDestinationColumn._id) {
                    return newDestinationColumn;
                }
                return item;
            })
        );
    };

    return (
        <BoardViewContainer>
            <BoardContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="board-columns" direction="horizontal" type="column">
                        {(provided) => (
                            <ColumnsWrapper {...provided.droppableProps} ref={provided.innerRef}>
                                {columns?.map((column) => <Column key={column._id} data={column} />) || null}
                                {provided.placeholder}
                            </ColumnsWrapper>
                        )}
                    </Droppable>
                </DragDropContext>
            </BoardContent>
        </BoardViewContainer>
    );
};

const BoardViewContainer = styled.div`
    height: 100%;
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const BoardContent = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 16px 0 0 32px;
    overflow-x: auto;
    overflow-y: hidden;
    user-select: none;
    white-space: nowrap;
`;

const ColumnsWrapper = styled.div`
    height: 100%;
    display: flex;
`;

export default BoardView;

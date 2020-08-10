import React, { useState, useEffect, useRef, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Column from './Column';
import AddColumn from './AddColumn';
import { Column as ColumnT, Board, Card } from '../../types';
import { GET_LISTS_BY_BOARD_ID, GET_BOARD } from '../../graphql/queries';
import { UPDATE_CARDS_IN_LIST, UPDATE_LISTS_ORDER } from '../../graphql/mutations';
import { useDebounce, arrangeDataByOrder, getItemsOrderArray } from '../../utils';
import BoardViewContext from 'contexts/BoardViewContext';
import { DialogContext, ModalTypes} from 'contexts/DialogContext'
import CardDetailModal from './CardDetailModal'

interface BoardViewProps {}

const BoardView = (props: BoardViewProps) => {
    const dialogContext = useContext(DialogContext)
    // get board ID from url params
    const match = useRouteMatch<{ board_id: string }>();

    // fetch data of board and lists in board
    const listsData = useQuery<{ lists: ColumnT[] }>(GET_LISTS_BY_BOARD_ID, { variables: { board_id: match.params.board_id } });
    const boardData = useQuery<{ board: Board }>(GET_BOARD, { variables: { id: match.params.board_id } });

    // Graphql mutation to persist columns data into DB
    const [gqlUpdateCardsInList] = useMutation<
        { updateCardsInList: { _id: string } },
        { list_id: string; cards: Card[]; cards_order: string }
    >(UPDATE_CARDS_IN_LIST);

    // Graphql mutation to update lists order in board
    const [gqlUpdateListsOrder] = useMutation<{ updateListOrder: Board }, { board_id: string; lists_order: string }>(UPDATE_LISTS_ORDER);

    // init columns and columns order data in state
    const [columns, setColumns] = useState<ColumnT[] | undefined>();
    const [columnsOrder, setColumnsOrder] = useState<string[]>();
    const columnsLoaded = useRef(false);

    // debounced value of columns, because columns data may change rapidly
    const debouncedColumns = useDebounce<ColumnT[]>(columns, 1000);

    useEffect(() => {
        // load columns into state when data fetching finishes
        if (listsData.data && boardData.data) {
            setColumns(arrangeDataByOrder(listsData.data.lists, boardData.data.board.lists_order));
            setColumnsOrder(boardData.data.board.lists_order?.split(',') || []);
        }
    }, [listsData, boardData]);

    useEffect(() => {
        // persist columns data into DB whenever it updates on UI
        // this operation has a debounce of 1s, thanks to `debouncedColumns`
        if (debouncedColumns) {
            if (columnsLoaded.current) {
                const listsOrder = debouncedColumns.map((column) => column._id).join(',');
                // update lists order in board to DB
                gqlUpdateListsOrder({
                    variables: {
                        board_id: match.params.board_id,
                        lists_order: listsOrder,
                    },
                });

                // update cards data and cards order in each list to DB
                debouncedColumns.forEach((column) => {
                    gqlUpdateCardsInList({
                        variables: {
                            list_id: column._id,
                            cards: column.cards || [],
                            cards_order: column.cards_order || '',
                        },
                    });
                });
            } else {
                columnsLoaded.current = true;
            }
        }
    }, [debouncedColumns, gqlUpdateCardsInList, gqlUpdateListsOrder, match.params.board_id]);

    /** UI logics to update cards order in columns, and columns order in board.
     * These changes are immediately reflected in state.
     */
    const onDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;
        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        // if a list is moved
        if (type === 'column' && columnsOrder) {
            const newColumnsOrder = [...columnsOrder];
            const movedColumn = newColumnsOrder.splice(source.index, 1)[0];
            newColumnsOrder.splice(destination.index, 0, movedColumn);
            const newColumns = arrangeDataByOrder(columns, newColumnsOrder.join(','));
            setColumns(newColumns);
            setColumnsOrder(newColumnsOrder);
            return;
        }

        // else if a card is moved
        const sourceColumn = columns!.find((item) => item._id === source.droppableId);
        const destinationColumn = columns!.find((item) => item._id === destination.droppableId);
        if (!sourceColumn || !destinationColumn) {
            return;
        }

        // item moves within the same list
        if (sourceColumn === destinationColumn) {
            const cardsOrderInColumn = getItemsOrderArray(sourceColumn.cards_order!);
            const movedCard = cardsOrderInColumn.splice(source.index, 1)[0];
            cardsOrderInColumn.splice(destination.index, 0, movedCard);
            const newColumn: ColumnT = {
                ...sourceColumn,
                cards_order: cardsOrderInColumn.join(','),
            };
            const result = columns!.map((item) => {
                if (item._id === newColumn._id) {
                    return newColumn;
                }
                return item;
            });
            setColumns(result);
            return;
        }

        // item moves from one list to another
        const cardsOrderInSourceColumn = getItemsOrderArray(sourceColumn.cards_order!);
        const cardsOrderInDestinationColumn = getItemsOrderArray(destinationColumn.cards_order!);
        const movedCardOrder = cardsOrderInSourceColumn.splice(source.index, 1)[0];
        cardsOrderInDestinationColumn.splice(destination.index, 0, movedCardOrder);

        const cardsInSourceColumn = [...(sourceColumn.cards || [])];
        const movedCard = cardsInSourceColumn.splice(source.index, 1)[0];
        const newSourceColumn: ColumnT = {
            ...sourceColumn,
            cards: cardsInSourceColumn,
            cards_order: cardsOrderInSourceColumn.join(','),
        };

        const cardsInDestinationColumn = [...(destinationColumn.cards || [])];
        cardsInDestinationColumn.splice(destination.index, 0, movedCard);
        const newDestinationColumn: ColumnT = {
            ...destinationColumn,
            cards: cardsInDestinationColumn,
            cards_order: cardsOrderInDestinationColumn.join(','),
        };
        setColumns(
            columns!.map((item) => {
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

    const onColumnAdded = (column_id?: string) => {
        if (column_id) {
            const currentListsOrder = [...(columnsOrder || [])];
            const newListsOrder = currentListsOrder.length ? currentListsOrder.concat(column_id) : [column_id];
            setColumnsOrder(newListsOrder);
            gqlUpdateListsOrder({ variables: { board_id: match.params.board_id, lists_order: newListsOrder.join(',') } }).then(() => {
                listsData.refetch();
                boardData.refetch();
            });
        }
    };

    const onCardAdded = (list_id: string, newCard?: Card) => {
        if (newCard) {
            const columData = columns?.find((item) => item._id === list_id);
            const currentCardsOrder = columData?.cards_order || '';
            const newCardsOrder = currentCardsOrder.length ? currentCardsOrder + `,${newCard._id}` : newCard._id;
            const newCards = (columData?.cards || []).concat(newCard);
            gqlUpdateCardsInList({
                variables: {
                    list_id,
                    cards: newCards,
                    cards_order: newCardsOrder,
                },
            }).then(() => {
                listsData.refetch();
            });
        }
    };

    return (
        <BoardViewContext.Provider value={{ onCardAdded }}>
            <BoardViewContainer>
                <BoardContent>
                {/* <CardDetailModal/> */}
                {dialogContext.openModals.find((modal) => modal.modalType === ModalTypes.CardDetail) !== undefined && (
                    <CardDetailModal />
                )}
                    {!!columns && (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="board-columns" direction="horizontal" type="column">
                                {(provided) => (
                                    <ColumnsWrapper {...provided.droppableProps} ref={provided.innerRef}>
                                        {columns.map((column, index) => <Column key={column._id} data={column} index={index} />) || null}
                                        {provided.placeholder}
                                    </ColumnsWrapper>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )}
                    <AddColumn onColumnAdded={onColumnAdded} boardId={match.params.board_id} />
                </BoardContent>
            </BoardViewContainer>
        </BoardViewContext.Provider>
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
    display: inline-flex;
    vertical-align: top;
`;

export default BoardView;

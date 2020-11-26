import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { rgba } from 'polished';

import { Column as ColumnT, Card } from '../../types';
import CardInList from './CardInList';
import { arrangeDataByOrder } from '../../utils';
import AddCard from './AddCard';

interface ColumnProps {
  data: ColumnT;
  index: number;
}

const Column = (props: ColumnProps) => {
  const { data, index } = props;
  const [cards, setCards] = useState<Card[]>(arrangeDataByOrder(data.cards, data.cards_order));
  useEffect(() => {
    setCards(arrangeDataByOrder(data.cards, data.cards_order));
  }, [data]);

  return (
    <Draggable draggableId={data._id} index={index}>
      {(provided) => (
        <ColumnContainer {...provided.draggableProps} ref={provided.innerRef}>
          <ColumnName {...provided.dragHandleProps}>
            {data.title} ({data.cards?.length || 0})
          </ColumnName>
          <Droppable droppableId={data._id} type="card">
            {(provided) => (
              <CardsList ref={provided.innerRef} {...provided.droppableProps}>
                {cards.map((card, index) => {
                  return <CardInList key={card._id} data={card} index={index} />;
                })}
                {provided.placeholder}
              </CardsList>
            )}
          </Droppable>
          <AddCard columnId={data._id} />
        </ColumnContainer>
      )}
    </Draggable>
  );
};

const ColumnContainer = styled.div`
  display: inline-block;
  width: calc(100vw / 5);
  margin-right: 24px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.light_blue};
  padding: 16px;
  position: relative;
  height: fit-content;
`;

const ColumnName = styled.label`
  color: ${(props) => rgba(props.theme.colors.black, 0.4)};
  font-size: 14px;
  width: 100%;
  outline: none;
  padding-bottom: 16px;
  display: block;
`;

const CardsList = styled.div`
  min-height: 1px;
`;

export default Column;

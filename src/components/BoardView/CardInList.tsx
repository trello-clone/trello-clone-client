import React, { useContext } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';

import { Card } from '../../types';
import { rgba } from 'polished';
import { DialogContext, ModalTypes } from '../../contexts/DialogContext';
import { CardInListContext } from '../../contexts/CardInListContext';

interface CardProps {
  data: Card;
  index: number;
}

const CardInList = (props: CardProps) => {
  const { data, index } = props;
  const { _id, title } = data;
  const dialogContext = useContext(DialogContext);
  const cardInListContext = useContext(CardInListContext);
  const handleOnClickCard = () => {
    dialogContext.openModal!({ modalType: ModalTypes.CardDetail });
    cardInListContext.setCurrentCard!(data)
  };
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleOnClickCard}
        >
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <LastUpdated>{moment(data._changed).fromNow()}</LastUpdated>
          </CardHeader>
        </Container>
      )}
    </Draggable>
  );
};

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: none;
  border-radius: 8px;
  margin: 8px 0 16px;
  padding: 16px;
  outline: none;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  color: ${(props) => props.theme.colors.black};
  font-size: 14px;
`;

const LastUpdated = styled.div`
  color: ${(props) => rgba(props.theme.colors.black, 0.3)};
  font-size: 12px;
`;

export default CardInList;

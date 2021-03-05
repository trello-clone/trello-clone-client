import React, { useState } from 'react';

import { Card } from '../types';

interface CardInListContextValue {
  cardInfo?: Card;
  setCurrentCard: ((card: Card) => void) | null;
}
const CardInListContext = React.createContext<CardInListContextValue>({
  cardInfo: undefined,
  setCurrentCard: null
});

const CardInListProvider = (props: any) => {
  const [cardInfo, setCardInfo] = useState<Card | undefined>(undefined);

  const setCurrentCard = (card: Card) => {
    setCardInfo(card);
  };

  return <CardInListContext.Provider value={{ cardInfo, setCurrentCard }}>{props.children}</CardInListContext.Provider>;
};

export { CardInListContext, CardInListProvider };

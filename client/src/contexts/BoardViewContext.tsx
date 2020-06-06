import React from 'react';

import { Card } from 'types';

interface BoardViewContextValue {
    onCardAdded?: (list_id: string, newCard?: Card) => void;
}

const BoardViewContext = React.createContext<BoardViewContextValue>({ onCardAdded: undefined });

export default BoardViewContext;

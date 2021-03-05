import React from 'react';

import { Card, User } from 'types';

interface BoardViewContextValue {
  onCardAdded?: (list_id: string, newCard?: Card) => void;
  all_users: User[] | null;
}

const BoardViewContext = React.createContext<BoardViewContextValue>({ onCardAdded: undefined, all_users: [] });

export default BoardViewContext;

export type Team = {
    _id: string;
    name?: string;
    description?: string;
    members: User[] | string [];
    personal: boolean;
};

export type User = {
    _id: string;
    email: string;
    name: string;
    avatar: string[];
    _created: string;
};

export type Board = {
   _id: string;
   title: string;
   team: Team[];
   background?: string;
   _created: string;
   _changed: string;
 };

export type Column = {
    _id: string;
    title: string;
    board_id: string;
    index: number;
    cards: Card[];
};

export type Card = {
    _id: string;
    title: string;
    description: string;
    index: number;
};
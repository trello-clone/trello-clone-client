export type Team = {
    _id: string;
    name?: string;
    description?: string;
    members: User[] | string[];
    personal: boolean;
    _created: string;
    _changed: string;
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
    team: Team[] | null;
    members: User[];
    background?: string;
    lists_order?: string;
    _created: string;
    _changed: string;
};

export type Column = {
    _id: string;
    title: string;
    board_id: string;
    cards?: Card[];
    cards_order?: string;
};

export type Card = {
    _id: string;
    title: string;
    description: string;
    _created: string;
    _changed: string;
};

enum ModalTypes {
    CreateBoard = 'CreateBoard',
    CreateTeam = 'CreateTeam',
    UpdateBoard = 'UpdateBoard',
    UpdateTeam = 'UpdateTeam',
}
export interface OpenModal {
    modalType: ModalTypes;
    dataType?: any;
}
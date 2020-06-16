import React, { useState } from 'react';
import { Team, Board} from '../types'

enum ModalTypes {
    CreateBoard = 'CreateBoard',
    CreateTeam = 'CreateTeam',
    UpdateBoard = 'UpdateBoard',
    UpdateTeam = 'UpdateTeam',
}

const DialogContext = React.createContext<DialogContextValue>({ openModals: [], openModalByType: null, closeModalByType: null, modalData: undefined });
interface DialogContextValue {
    openModals: ModalTypes[];
    modalData?: Team| Board;
    openModalByType: ((modalType: ModalTypes, dataType?: Team | Board) => void) | null;
    closeModalByType: ((modalType: ModalTypes) => void) | null;
}

const DialogProvider = (props: any) => {
    const [openModals, setOpenModals] = useState<ModalTypes[]>([]);
    const [modalData, setModalData] = useState<Team|Board>();

    const openModalByType = (modalType: ModalTypes, data?: Team | Board) => {
        if (!openModals.includes(modalType)) {
            setOpenModals(openModals.concat(modalType));
            setModalData(data)
        }
    };
    const closeModalByType = (modalType: ModalTypes) => {
        const index = openModals.indexOf(modalType);
        const newOpenModal = [...openModals];
        newOpenModal.splice(index, 1);
        setOpenModals(newOpenModal);
        setModalData(undefined)
    };
    return <DialogContext.Provider value={{ openModals, closeModalByType, openModalByType, modalData }}>{props.children}</DialogContext.Provider>;
};

export { DialogContext, ModalTypes, DialogProvider };

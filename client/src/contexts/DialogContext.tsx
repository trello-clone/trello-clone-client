import React, { useState } from 'react';

enum ModalTypes {
    CreateBoard = 'CreateBoard',
    CreateTeam = 'CreateTeam',
    UpdateBoard = 'UpdateBoard',
    UpdateTeam = 'UpdateTeam',
}
interface OpenModal {
    modalType: ModalTypes;
    dataType?: any;
}
const DialogContext = React.createContext<DialogContextValue>({ openModals: [], openModal: null, closeModal: null});
interface DialogContextValue {
    openModals: OpenModal[];
    openModal: ((modal: OpenModal) => void) | null;
    closeModal: ((modal: OpenModal) => void) | null;
}

const DialogProvider = (props: any) => {
    const [openModals, setOpenModals] = useState<OpenModal[]>([]);
    const openModal = (modal: OpenModal) => {
        if(openModals.find(openModal => openModal.modalType === modal.modalType) === undefined){
            setOpenModals(openModals.concat(modal))
        }
    };
    const closeModal= (modal: OpenModal) => {
        const index = openModals.indexOf(modal);
        const newOpenModal = [...openModals];
        newOpenModal.splice(index, 1);
        setOpenModals(newOpenModal);
    };
    return <DialogContext.Provider value={{ openModals, closeModal, openModal}}>{props.children}</DialogContext.Provider>;
};

export { DialogContext, ModalTypes, DialogProvider };

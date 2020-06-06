import React, { useState } from 'react';

enum ModalTypes {
    CreateBoard = 'CreateBoard',
    CreateTeam = 'CreateTeam',
}
const DialogContext = React.createContext<DialogContextValue>({ openModals: [], openModalByType: null, closeModalByType: null });
interface DialogContextValue {
    openModals: ModalTypes[];
    openModalByType: ((modalType: ModalTypes) => void) | null;
    closeModalByType: ((modalType: ModalTypes) => void) | null;
}

const DialogProvider = (props: any) => {
    const [openModals, setOpenModals] = useState<ModalTypes[]>([]);

    const openModalByType = (modalType: ModalTypes) => {
        if (!openModals.includes(modalType)) {
            setOpenModals(openModals.concat(modalType));
        }
    };
    const closeModalByType = (modalType: ModalTypes) => {
        const index = openModals.indexOf(modalType);
        const newOpenModal = [...openModals];
        newOpenModal.splice(index, 1);
        setOpenModals(newOpenModal);
    };
    return <DialogContext.Provider value={{ openModals, closeModalByType, openModalByType }}>{props.children}</DialogContext.Provider>;
};

export { DialogContext, ModalTypes, DialogProvider };

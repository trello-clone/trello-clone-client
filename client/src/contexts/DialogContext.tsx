import React, { useState } from 'react';

enum ModalTypes {
    CreateBoard = 'CreateBoard',
}
const DialogContext = React.createContext<DialogContextValue>({ openModals: [], openModalByType: null, closeModalByType: null });
interface DialogContextValue {
    openModals: ModalTypes[];
    openModalByType: any;
    closeModalByType: any;
}
interface DialogProviderProps {
    children: React.ReactNode;
}

const DialogProvider = (props: any) => {
    const [openModals, setOpenModals] = useState<ModalTypes[]>([]);

    const closeModalByType = (modalType: ModalTypes) => {
        const index = openModals.indexOf(ModalTypes.CreateBoard);
        const newOpenModal = [...openModals];
        newOpenModal.splice(index, 1);
        setOpenModals(newOpenModal);
    };
    const openModalByType = (modalType: ModalTypes) => {
        if (!openModals.includes(modalType)) {
            setOpenModals(openModals.concat(modalType));
        }
    };
    return <DialogContext.Provider value={{ openModals, closeModalByType, openModalByType }}>{props.children}</DialogContext.Provider>;
};

export { DialogContext, ModalTypes, DialogProvider };

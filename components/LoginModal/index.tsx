"use client";

import * as React from "react";
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import useloginStore from "@/store/loginStore";
import LoginForm from "./LoginForm";

const LoginDialog = () => {
    const { loginModalvisible, setLoginModalVisible } = useloginStore();

    const handleClose = () => {
        setLoginModalVisible(false);
    };

    return (
        <Modal open={loginModalvisible} onClose={() => setLoginModalVisible(false)}>
            <ModalDialog>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>Fill in the information of the project.</DialogContent>
                <LoginForm />
            </ModalDialog>
        </Modal>
    );
};

export default LoginDialog;

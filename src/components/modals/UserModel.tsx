'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { EditUser } from "./EditUser";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import ModalBackground from "../styled-components/ModalBackground";
import StyledModal from "../styled-components/StyledModal";

export function UserModal({setIsModalOpen}: {setIsModalOpen: Dispatch<SetStateAction<boolean>>}) {
	const [modalType, setModalType] = useState("editUser")

    return (
		<ModalBackground onClick={() => setIsModalOpen(false)}>
			<StyledModal onClick={(e) => e.stopPropagation()}>
				{modalType === "editUser" && <EditUser setModalType={setModalType} setIsModalOpen={setIsModalOpen}/>}
				{modalType === "signIn" && <SignIn setModalType={setModalType} setIsModalOpen={setIsModalOpen}/>}
				{modalType === "signUp" && <SignUp setModalType={setModalType} setIsModalOpen={setIsModalOpen}/>}
			</StyledModal>
		</ModalBackground>
    )
}
'use client'

import { Dispatch, SetStateAction, useState } from "react";
import { EditUser } from "./EditUser";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import ModalBackground from "./styled-components/ModalBackground";
import StyledModal from "./styled-components/StyledModal";

export function UserModal({setIsModelOpen}: {setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [modalType, setModalType] = useState("editUser")

    return (
		<ModalBackground onClick={() => setIsModelOpen(false)}>
			<StyledModal onClick={(e) => e.stopPropagation()}>
				{modalType === "editUser" && <EditUser setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
				{modalType === "signIn" && <SignIn setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
				{modalType === "signUp" && <SignUp setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
			</StyledModal>
		</ModalBackground>
    )
}
'use client'

import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { EditUser } from "./EditUser";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
`

const StyledCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
    border: 2px solid black;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 90vw;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`

export function UserModal({setIsModelOpen}: {setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [modalType, setModalType] = useState("editUser")

    return (
		<ModalBackground onClick={() => setIsModelOpen(false)}>
			<StyledCard onClick={(e) => e.stopPropagation()}>
				{modalType === "editUser" && <EditUser setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
				{modalType === "signIn" && <SignIn setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
				{modalType === "signUp" && <SignUp setModalType={setModalType} setIsModelOpen={setIsModelOpen}/>}
			</StyledCard>
		</ModalBackground>
    )
}
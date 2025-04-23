'use client'

import { Dispatch, SetStateAction, useContext, useState } from "react";
import styled from "styled-components";
import { EditUser } from "./EditUser";
import { SignIn } from "./SignIn";
import { UserContext } from "@/contexts/User";
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
`;


const StyledCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`

export function UserModal({setIsModelOpen}: {setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [modalType, setModalType] = useState("editUser")

	const {user, setUser} = useContext(UserContext)
	const [name, setName] = useState(user.name ?? "")
	const [email, setEmail] = useState(user.email ?? "")

	function closeModal() {
		setIsModelOpen(false)
		setUser({name: name.trim(), email: email.trim()})
	}

    return (
		<ModalBackground onClick={closeModal}>
			<StyledCard onClick={(e) => e.stopPropagation()}>
				{modalType === "editUser" && <EditUser setModalType={setModalType}
					name={name} setName={setName} email={email} setEmail={setEmail}/>}
				{modalType === "signIn" && <SignIn setModalType={setModalType}/>}
				{modalType === "signUp" && <SignUp setModalType={setModalType}/>}
			</StyledCard>
		</ModalBackground>
    )
}
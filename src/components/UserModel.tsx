'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { EditUser } from "./EditUser";
import { SignIn } from "./SignIn";

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
	padding: 2vh 4.5vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	min-width: 320px;
	max-width: 500px;
	width: 90%;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`

export function UserModal({setIsModelOpen}: {setIsModelOpen: Dispatch<SetStateAction<boolean>>}) {
	const [modalType, setModalType] = useState("editUser")

	const closeModal = () => setIsModelOpen(false)

    return (
		<ModalBackground onClick={closeModal}>
			<StyledCard onClick={(e) => e.stopPropagation()}>
				{modalType === "editUser" && <EditUser setModalType={() => setModalType("editUser")}/>}
			</StyledCard>
		</ModalBackground>
    )
}
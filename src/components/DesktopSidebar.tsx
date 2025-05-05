'use client'

import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/User";
import { useRouter } from "next/navigation";
import { UserModal } from "./modals/UserModal";

const StyledSidebar = styled.footer`
    position: fixed;
    left: 0;
    top: 0;
    width: 20%;
    height: 100%;
    padding: 0vw;
    background: ${props => props.theme.colours.primary};
    display: grid;
    justify-items: center;
    text-align: center;
    border: 2px solid white;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    z-index: 9;
    box-sizing: border-box;
`

const IconWrapper = styled.div`
    margin-top: 2px;
    font-size: 5vw;
    line-height: 1.1;
    color: ${props => props.theme.colours.primary};
    svg {
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    }
    svg path {
        stroke: black;
        stroke-width: 5;
    }
`

const StyledText = styled.p`
    font-size: 3vw;
    color: ${props => props.theme.colours.secondary};
    &:hover {
        color: ${props => props.theme.colours.secondary};  // Change the color when hovered
        transform: scale(1.2);  // Slightly scale the icon when hovered
        cursor: pointer;  // Change the cursor to indicate it's clickable
    }
`

export default function SideBar() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const router = useRouter()
    const { user } = useContext(UserContext)

	const handleUserClick = () => {
        if (user.name && user.email && user.role === 'admin') router.push('/user')
		else if (setIsModalOpen) setIsModalOpen(true)
    }

	return (
        <>
            {isModalOpen && <UserModal setIsModalOpen={setIsModalOpen}/>}
            <StyledSidebar>
                <Link href='/'>
                    <StyledText>
                        Home
                        <IconWrapper>
                            <FontAwesomeIcon icon={faHouse} />
                        </IconWrapper>
                    </StyledText>
                </Link>

                <Link href='search'>
                    <StyledText>
                        Search
                        <IconWrapper>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </IconWrapper>
                    </StyledText>
                </Link>
                
                <span onClick={handleUserClick}>
                    <StyledText>
                        User
                        <IconWrapper>
                            <FontAwesomeIcon icon={faUser} />
                        </IconWrapper>
                    </StyledText>
                </span>
            </StyledSidebar>
        </>
    )
}
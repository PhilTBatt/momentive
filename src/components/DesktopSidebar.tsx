'use client'

import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/User";
import { useRouter } from "next/navigation";
import { UserModal } from "./modals/UserModal";

const StyledSidebar = styled.section`
    position: fixed;
    left: 0;
    top: 0;
    width: 18%;
    height: 100%;
    border: 4px solid white;
    box-sizing: border-box;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    background: ${props => props.theme.colours.primary};
    padding: 0vw;
    display: grid;
    justify-items: center;
    text-align: center;
    z-index: 9;
`

const IconWrapper = styled.span`
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
        color: ${props => props.theme.colours.secondary};
        transform: scale(1.2);
        cursor: pointer;
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
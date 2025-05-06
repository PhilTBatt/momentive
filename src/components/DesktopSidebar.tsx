'use client'

import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";
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
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    z-index: 9;
`

const StyledText = styled.p`
    font-size: 2.25vw;
    margin: 2vh 0vw 0vh 0vw;
    padding-bottom: 1vh;
    border-bottom: 1px solid black;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: black;
    vertical-align: middle;
    &:hover {
        color: ${props => props.theme.colours.secondary};
        transform: scale(1.03, 1.1);
        cursor: pointer;
    }
`

const IconWrapper = styled.span`
    font-size: 3vw;
    margin: 0vh 0vw 1vh 1vw;
    display: inline-block;
    vertical-align: middle;
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

const StyledFooter = styled.footer`
    margin: 60vh 0 0vh 0;
    font-size: 1vw;
    color: black;
`
const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none; /* Remove underline from all links */
  }
`;

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
            <GlobalStyle />
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
                
                <StyledFooter>
                    © 2025 Momentive · Designed and developed by Phil Battersby
                </StyledFooter>
            </StyledSidebar>
        </>
    )
}
'use client'

import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/User";
import { useRouter } from "next/navigation";
import { UserModal } from "../modals/UserModal";

const StyledNavBar = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0vw;
    background: ${props => props.theme.colours.secondary};
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    text-align: center;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
    border: 2px solid ${props => props.theme.colours.primary};
    border-radius: 6px;
    box-sizing: border-box;
`

const IconWrapper = styled.div`
    margin-top: 2px;
    font-size: 13vw;
    line-height: 1.1;
    color: ${props => props.theme.colours.primary};
    svg {
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    }
    svg path {
        stroke: black;
        stroke-width: 5;
    }
    &:hover {
        cursor: pointer;
    }
`

export default function NavBar() {
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
            <StyledNavBar>
                <Link href='search'>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </IconWrapper>
                </Link>

                <Link href='/'>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faHouse} />
                    </IconWrapper>
                </Link>
                
                <span onClick={handleUserClick}>
                    <IconWrapper>
                        <FontAwesomeIcon icon={faUser} />
                    </IconWrapper>
                </span>
            </StyledNavBar>
        </>
    )
}
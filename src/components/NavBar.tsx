'use client'

import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction, useContext } from "react";
import { UserContext } from "@/contexts/User";
import { useRouter } from "next/navigation";

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
    font-size: 17vw;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
    z-index: 10;
`

const IconWrapper = styled.div`
    color: ${props => props.theme.colours.primary};
    svg {
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))
    }
`

export default function NavBar({setIsModelOpen}: {setIsModelOpen: Dispatch<SetStateAction<boolean>> | null}) {
    const router = useRouter()
    const { user } = useContext(UserContext)

	const handleUserClick = () => {
        if (user.name && user.email && user.role === 'admin') router.push('/user')
		else if (setIsModelOpen) setIsModelOpen(true)
    }

	return (
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
    )
}
'use client'

import styled from 'styled-components';
import { ReactNode } from 'react';
import Header from './Header';
import NavBar from './MobileNavBar';

const StyledWrapper = styled.div`
    padding-top: 12.5vh;
    padding-bottom: 27vw;
    display: grid;
    place-items: center;
    text-align: center;
    @media (min-width: 768px) {
        display: none;
    }
`

export default function MobileWrapper({ children }: { children: ReactNode }) {
    return (
        <StyledWrapper>
            <Header />
            {children}
            <NavBar />
        </StyledWrapper>
    )
}
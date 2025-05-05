'use client'

import styled from 'styled-components';
import { ReactNode } from 'react';
import Header from './MobileHeader';
import NavBar from './MobileNavBar';

const StyledWrapper = styled.div`
    padding-top: 23vw;
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
            <NavBar />
            {children}
        </StyledWrapper>
    )
}
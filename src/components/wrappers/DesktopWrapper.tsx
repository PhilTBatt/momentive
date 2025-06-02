'use client'

import styled from 'styled-components';
import { ReactNode } from 'react';
import Header from './Header';
import SideBar from './DesktopSidebar';

const DesktopStyledWrapper = styled.div`
    padding: 20vh 0% 5vh 18%;
    display: grid;
    place-items: center;
    text-align: center;
    @media (max-width: 768px) {
        display: none;
    }
`

export default function DesktopWrapper({ children }: { children: ReactNode }) {
    return (
        <DesktopStyledWrapper>
            <Header />
            <SideBar />
            {children}
        </DesktopStyledWrapper>
    )
}
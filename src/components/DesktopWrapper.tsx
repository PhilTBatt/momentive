'use client'

import styled from 'styled-components';
import { ReactNode } from 'react';
import Header from './MobileHeader';
import SideBar from './DesktopSidebar';

const DesktopStyledWrapper = styled.div`
    padding-top: 23vw;
    padding-bottom: 27vw;
    display: grid;
    place-items: center;
    text-align: center;
    @media (max-width: 767px) {
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
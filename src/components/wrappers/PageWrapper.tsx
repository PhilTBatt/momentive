'use client'

import { ReactNode } from 'react';
import MobileWrapper from './MobileWrapper';
import DesktopWrapper from './DesktopWrapper';

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <>
            <MobileWrapper>
                {children}
            </MobileWrapper>

            <DesktopWrapper>
                {children}
            </DesktopWrapper>
        </>
    )
}
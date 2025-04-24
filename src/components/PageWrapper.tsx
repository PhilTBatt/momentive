'use client'

import styled from 'styled-components';
import { ReactNode } from 'react';

const StyledWrapper = styled.div`
    padding-bottom: 20vw;
`

export default function PageWrapper({ children }: { children: ReactNode }) {
    return <StyledWrapper>{children}</StyledWrapper>
}
import styled from "styled-components";
import { ReactNode } from "react";

const StyledBox = styled.div<{ width: number, height: number }>`
    height: ${({ height }) => `${height}vh`};
    width: ${({ width }) => `${width}vw`};
    border-radius: 1.55vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: black;
    border-width: 0.5vh;
    border-style: solid;
    background-color: ${({ theme }) => theme.colours.background};
    margin: 0.75vh;
    flex-wrap: wrap;
`

interface MyBoxProps {
    children: ReactNode;
    width: number;
    height: number;
}

export function MyBox({ children, width, height }: MyBoxProps) {
    return (
        <StyledBox width={width} height={height}>
            {children}
        </StyledBox>
    )
}
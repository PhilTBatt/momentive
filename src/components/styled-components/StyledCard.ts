'use client'

import styled from 'styled-components'

export const StyledCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 0.5vh 1vw;
	border-radius: 12px;
	box-shadow: 0 4px 20px 4px rgba(0, 0, 0, 0.25);
	width: 90vw;
    border: 2px solid black;
`
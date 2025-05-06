'use client'

import styled from "styled-components";

const StyledCard = styled.li`
    border: 2px solid white;
    margin: 0 0 4vw 0;
    background-color: ${props => props.theme.colours.background};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    &:last-child {
        margin-bottom: 0;
    }
`

const UserInfo = styled.h3`
    font-size: 5.5vw;
    margin: 4vw 0.25vw 4vw 0.25vw;

    @media (min-width: 768px) {
        font-size: 2vw;
    }
`

export function UserCard({user}: {user: {name: string, email: string}}) {
    return (
        <StyledCard>
            <UserInfo>
                {user.name}
                <br/>
                {user.email}
            </UserInfo>
        </StyledCard>

    )
}
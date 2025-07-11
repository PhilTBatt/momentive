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

    @media (min-width: 768px) {
        width: 14vw;
        margin: 0 0 2vh 0;
        &:last-child {
            margin-bottom: 1vh;
        }
    }
`

const UserName = styled.h3`
    font-size: 5vw;
    margin: 1vh 0vw 1vh 0vw;

    @media (min-width: 768px) {
        font-size: 1vw;
        margin: 1vh 0vw 0.5vh 0vw;
    }
`

const UserEmail = styled(UserName)`
    font-size: 4vw;

    @media (min-width: 768px) {
        font-size: 0.8vw;
        margin: 0vh 0vw 1vh 0vw;
    }
`

export function UserCard({user}: {user: {name: string, email: string}}) {
    return (
        <StyledCard>
            <UserName>
                {user.name}
            </UserName>
            <UserEmail>
                {user.email}
            </UserEmail>
        </StyledCard>

    )
}
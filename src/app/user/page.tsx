'use client'

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserContext } from "@/contexts/User";
import { useContext } from "react";
import styled from "styled-components";

const StyledText = styled.h2`
    text-align: center;
    font-size: 10vw;
    margin: 3vh auto;
`
const StyledCard = styled.div`
	background: ${props => props.theme.colours.primary};
	padding: 1vh 1vw;
	border-radius: 12px;
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	width: 92vw;
	align-items: center;
	justify-content: center;
	text-align: center;
	z-index: 101;
`
const StyledHeading = styled.h3`
  	text-align: center;
  	font-size: 6vw;
  	margin-top: 3vw;
  	margin-bottom: 6vw;
`
const Button = styled.button`
	font-size: 4.5vw;
`

export default function Home() {
    const {user, setUser} = useContext(UserContext)
    
  	return (
    	<>
      	    <Header/>
            <PageWrapper>
                <StyledText>
                    Manage Events
                </StyledText>
                <StyledCard>
                    <StyledHeading>
                        Events
                    </StyledHeading>
                </StyledCard>
                <StyledText>
                    Manage Account
                </StyledText>
                <StyledCard>
                    <StyledHeading>
                        {user.name}
                    </StyledHeading>
                    <Button>
                        Edit User
                    </Button>
                </StyledCard>
            </PageWrapper>
      		<NavBar setIsModelOpen={null}/>
    	</>
  	)
}
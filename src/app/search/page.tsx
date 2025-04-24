'use client';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/UserModel";
import { useState } from "react";
import styled from "styled-components";

const StyledText = styled.h2`
    font-size: 10vw;
    margin: 3vh auto;
`

export default function Search() {
	const [isModelOpen, setIsModelOpen] = useState(false)
	// const isUserSignedIn = false

  	return (
    	<>
      		<Header/>
            <PageWrapper>
                <StyledText>
                    Search
                </StyledText>
			    {isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
            </PageWrapper>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}
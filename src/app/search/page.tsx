'use client';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import PageWrapper from "@/components/PageWrapper";
import { UserModal } from "@/components/UserModel";
import { useState } from "react";

export default function Search() {
	const [isModelOpen, setIsModelOpen] = useState(false)
	// const isUserSignedIn = false

  	return (
    	<>
      		<Header/>
            <PageWrapper>
			    {isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
            </PageWrapper>
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}
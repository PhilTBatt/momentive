'use client';

import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { UserModal } from "@/components/UserModel";
import { useState } from "react";

export default function Search() {
	const [isModelOpen, setIsModelOpen] = useState(false)
	// const isUserSignedIn = false

  	return (
    	<>
      		<Header/>
			{isModelOpen && <UserModal setIsModelOpen={setIsModelOpen}/>}
      		<NavBar setIsModelOpen={setIsModelOpen}/>
    	</>
  	)
}
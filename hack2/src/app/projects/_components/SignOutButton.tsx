// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
"use client";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";


export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut(); // Call the signOut function from next-auth/react to sign out the user
  };
  return (
  
    <Button data-testid="sign-out-button" variant={"outline"} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
  }
// TODO: 4. end

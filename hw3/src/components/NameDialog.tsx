"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, validateHandle, validateUsername } from "@/lib/utils";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  
  const [usernameError, setUsernameError] = useState(false);
  const [handleError, setHandleError] = useState(false);

  // check if the username and handle are valid when the component mounts
  // only show the dialog if the username or handle is invalid
  useEffect(() => {
    const username = searchParams.get("username");
    
    // if any of the username or handle is not valid, open the dialog
    setDialogOpen(!validateUsername(username));
  }, [searchParams]);

  // handleSave modifies the query params to set the username and handle
  // we get from the input fields. src/app/page.tsx will read the query params
  // and insert the user into the database.
  const handleSave = () => {
    const username = usernameInputRef.current?.value;
    

    const newUsernameError = !validateUsername(username);
    setUsernameError(newUsernameError);
    

    if (newUsernameError ) {
      return false;
    }

    // when navigating to the same page with different query params, we need to
    // preserve the pathname, so we need to manually construct the url
    // we can use the URLSearchParams api to construct the query string
    // We have to pass in the current query params so that we can preserve the
    // other query params. We can't set new query params directly because the
    // searchParams object returned by useSearchParams is read-only.
    const params = new URLSearchParams(searchParams);
    // validateUsername and validateHandle would return false if the input is
    // invalid, so we can safely use the values here and assert that they are
    // not null or undefined.
    params.set("username", username!);
    
    router.push(`${pathname}?${params.toString()}`);
    setDialogOpen(false);

    return true;
  };

  // You might notice that the dialog doesn't close when you click outside of
  // it. This is beacuse we perform some validation when the dialog closes.
  // If you pass `setDialogOpen` directly to the Dialog component, it will
  // behave like a normal dialog and close when you click outside of it.
  //
  // The Dialog component calls onOpenChange when the dialog wants to open or
  // close itself. We can perform some checks here to prevent the dialog from
  // closing if the input is invalid.
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // If handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      handleSave() && setDialogOpen(false);
    }
  };

  return (
    // <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
    //     <div className="max-w-3xl mx-auto">
    //       <div className="grid grid-cols-4 gap-4 items-center">
    //         <span>Name:</span>
    //         <Input
    //           ref={usernameInputRef}
    //           className="col-span-3"
    //           defaultValue={"username" || ''}
    //           placeholder="Your Name"
    //         />
    //         <span>Handle:</span>
    //         <div className="flex col-span-3 items-center">
    //           <span className="mr-2">@</span>
    //           <Input
    //             ref={handleInputRef}
    //             className="flex-1"
    //             defaultValue={"handle" || ''}
    //             placeholder="Your Handle"
    //           />
    //         </div>
    //       </div>
    //       <div className="text-right mt-2">
    //         {/* <Button onClick={updateParams}>Update</Button> */}
    //       </div>
    //       {(usernameError || handleError) && (
    //         <p className="text-red-500 text-xs mt-2">
    //           Please enter a valid name and handle.
    //         </p>
    //       )}
    //     </div>
    //   </div>
    <div></div>
  );
}

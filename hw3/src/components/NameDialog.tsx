"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, validateHandle, validateUsername } from "@/lib/utils";
import useUserInfo from "@/hooks/useUserInfo";

export default function NameDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const handleInputRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState(false);
  const [handleError, setHandleError] = useState(false);
  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const { username } = useUserInfo();

  // useEffect(() => {
  //   // You should load your usernames here, for the example I'll use a static array
  //   const usernamesList = ['alice', 'bob', 'charlie']; // Replace with actual data fetching
  //   setUsernames(usernamesList);
  // }, []);
  useEffect(() => {
    // Define an asynchronous function to fetch the data
    const fetchUsernames = async () => {
      try {
        const response = await fetch('/api/users'); // Your endpoint to fetch usernames
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsernames(data.usernames); // Assuming the response has a `usernames` field
      } catch (error) {
        console.error('Failed to fetch usernames:', error);
        // Handle errors here, e.g., set an error state, show a notification, etc.
      }
    };

    // Call the fetch function
    fetchUsernames();
  }, []);

    const handleUsernameSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newUsername = e.target.value;
      setSelectedUsername(newUsername);
      usernameInputRef.current!.value = newUsername;
    };

  useEffect(() => {
    const username = searchParams.get("username");
    const handle = searchParams.get("handle");
    
    setDialogOpen(!validateUsername(username) || !validateHandle(handle));
  }, [searchParams]);

  const handleSave = () => {
    const username = usernameInputRef.current?.value;
    const handle = handleInputRef.current?.value;

    const newUsernameError = !validateUsername(username);
    setUsernameError(newUsernameError);
    const newHandleError = !validateHandle(handle);
    setHandleError(newHandleError);

    if (newUsernameError || newHandleError) {
      return false;
    }

    const params = new URLSearchParams(searchParams);
   
    params.set("username", username!);
    params.set("handle", handle!);
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
    <div className="p-4">
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSave();
      }}>
        <div className="mb-4">
          <Label htmlFor="username">使用者名稱</Label>
          <Input
            id="username"
            placeholder="輸入使用者名稱"
            defaultValue={searchParams.get("username") ?? ""}
            className={cn(usernameError && "border-red-500")}
            ref={usernameInputRef}
          />
          {usernameError && (
            <p className="text-xs text-red-500">
              Invalid username, use only [a-z0-9 ], must be between 1 and 50 characters long.
            </p>
          )}
        </div>
        <div className="mb-4" style={{ display: 'none' }}>
          <Label htmlFor="handle">Handle</Label>
          <div className="flex items-center gap-2">
            <span>@</span>
            <Input
              id="handle"
              placeholder="web.prog"
              defaultValue={"chen"}
              className={cn(handleError && "border-red-500")}
              ref={handleInputRef}
              
            />
          </div>
  
        </div>
        <Button type="submit">確認</Button>
        <select
            value={selectedUsername}
            onChange={handleUsernameSelect}
            className="form-select"
          >
            <option value="">切換使用者</option>
            {usernames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        
      </form>
    </div>
  );
}

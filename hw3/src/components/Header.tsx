"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Bookmark,
  FileText,
  Home,
  Mail,
  MoreHorizontal,
  Search,
  User,
  Users,
} from "lucide-react";

import larry from "@/assets/larry.png";
import { cn } from "@/lib/utils";
import ProfileButton from "./ProfileButton";

export default function Header() {
  const [usernames, setUsernames] = useState<string[]>([]); // Stores the list of usernames
  const [currentUsername, setCurrentUsername] = useState(''); // Stores the currently selected username
  const [usernameError, setUsernameError] = useState(false);


  // Ref hooks from NameDialog component
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const saveUsername = () => {
    const username = usernameInputRef.current?.value;
    if (username && !usernames.includes(username)) {
      setUsernames([...usernames, username]);
      setCurrentUsername(username); // Optionally set the new name as the current user
    }
  };
  const switchUser = (username: string) => {
    setCurrentUsername(username);
  };
  const renderSavedUsernames = () => {
    return usernames.map((username, index) => (
      <div key={index} onClick={() => switchUser(username)} className="cursor-pointer hover:bg-gray-200 p-2">
        {username}
      </div>
    ));
  };
  
  return (
    <aside className="flex h-screen flex-col justify-between px-6 py-6">
      {/* ... other links and buttons */}
      <div>
        <ProfileButton />
        {/* Name input section */}
        <div className="mt-4">
          <div className="flex items-center">
            <Label>Name:</Label>
            <Input
              ref={usernameInputRef}
              className="ml-2"
              defaultValue={currentUsername || ''}
              placeholder="Your Name"
              onBlur={saveUsername} // Optionally save when the input loses focus
            />
          </div>
          <button onClick={saveUsername} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Save Name
          </button>
          {/* Display list of saved usernames */}
          <div className="mt-2">
            <button onClick={() => setUsernameError(!usernameError)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              {usernameError ? 'Hide Usernames' : 'Show Usernames'}
            </button>
            {usernameError && renderSavedUsernames()}
          </div>
          {/* Error message if needed */}
          {(usernameError) && (
            <p className="text-red-500 text-xs mt-2">
              Please enter a valid name and handle.
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

type HeaderButtonProps = {
  // allow size, and strokeWidth to be string to match lucide-react's size prop
  // this is basically a interface so that we can pass in custom component if we need to
  Icon: React.ComponentType<{
    size?: number | string;
    strokeWidth?: number | string;
  }>;
  text: string;
  active?: boolean;
};

function HeaderButton({ Icon, text, active }: HeaderButtonProps) {
  return (
    <button className="group w-full">
      <div
        // prefix a class with hover: to make it only apply when the element is hovered
        className="flex w-fit items-center gap-4 rounded-full p-2 transition-colors duration-300 group-hover:bg-gray-200 lg:pr-4"
      >
        <div className="grid h-[40px] w-[40px] place-items-center">
          <Icon
            // now that we defined the interface for Icon, we can pass in the size and strokeWidth props safely
            size={26}
            strokeWidth={active ? 3 : 2}
          />
        </div>
        <span
          // the `cn` helper function basically concatenate your tailwind classes in a safe way
          // on the surface, it will remove any falsy values from the array, it also remove any redundant classes
          // this is useful for conditional classes
          // prefixing a class with max-lg: makes it only apply to screen size below lg, this is the tailwind way of media queries
          // likewise, prefixing a class with lg: makes it only apply to screen size above lg
          // read more about tailwind responsive design here: https://tailwindcss.com/docs/responsive-design
          className={cn("text-xl max-lg:hidden", active && "font-bold")}
        >
          {text}
        </span>
      </div>
    </button>
  );
}

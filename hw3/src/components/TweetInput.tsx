"use client";

import { useRef ,useState} from "react";

import { ChevronDown } from "lucide-react";

import GrowingTextarea from "@/components/GrowingTextarea";
import UserAvatar from "@/components/UserAvatar";
import { Separator } from "@/components/ui/separator";
import useTweet from "@/hooks/useTweet";
import useUserInfo from "@/hooks/useUserInfo";
import { cn } from "@/lib/utils";

type TweetData = {
  text:string;
  startDate: string;
  endDate: string;
};


export default function TweetInput() {
  const { handle } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { postTweet, loading } = useTweet();
  // State for managing dialog visibility
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [tweetData, setTweetData] = useState<TweetData | null>(null);
  const handleSaveTweetData = async (data: TweetData) => {
    setTweetData(data); // You already have this line, make sure it's receiving the proper data
  
    // Now include the received data in the tweet content
    try {
      if (!handle) return;
      await postTweet({
        handle,
        content: `${data.text} (Start: ${data.startDate}, End: ${data.endDate})`,
      });
      // Reset the dialog and any inputs if needed
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      alert("Error posting tweet");
    }
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleTweet = async () => {
    setDialogOpen(true);
  };
  const InputDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: TweetData) => void;
  }> = ({ isOpen, onClose, onSave }) => {
    const [text, setText] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    const handleSave = () => {
      onSave({ text,startDate, endDate });
      onClose();
    };
  
  // A simple modal dialog component for user inputs
  
  
  
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col space-y-4">
          <h3 className="text-lg font-bold">新增活動</h3>
          <div className="flex flex-col">

            <label>
              Text:
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border-2"
              />
            </label>
            <label>
              start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 p-1"
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-2 p-1"
              />
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={onClose} className="px-4 py-2 border rounded text-sm">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 border rounded bg-blue-500 text-white text-sm">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
      {/* ...inside the TweetInput function... */}

      {isDialogOpen && (
        <InputDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSaveTweetData}
        />
      )}

      <UserAvatar className="h-12 w-12" />
      <div className="flex w-full flex-col px-2">
        {/* <button className="flex w-fit items-center rounded-full border-[1px] border-gray-300 px-2 text-sm font-bold text-brand">
          Everyone
          <ChevronDown size={16} className="text-gray-300" />
        </button> */}
        {/* <div className="mb-2 mt-6">
          <GrowingTextarea
            ref={textareaRef}
            className="bg-transparent outline-none placeholder:text-gray-500"
            placeholder="What's happening?"
          />
        </div> */}
        <Separator />
        <div className="flex justify-end">
          <button
            className={cn(
              "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
              "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
            )}
            onClick={handleTweet}
            disabled={loading}
          >
            新增
          </button>
        </div>
      </div>
    </div>
  );
}

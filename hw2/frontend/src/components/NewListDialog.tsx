import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const textfieldRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();

  const handleAddList = async () => {
    try {
      const name = textfieldRef.current?.value ?? "";
      const photoUrl = "https://thedispatchonline.net/wp-content/uploads/2020/06/FineLinealbumcover-900x885.jpg"; // Replace with your desired default URL
      await createList({ name:name, photoUrl: photoUrl }); // Include photoUrl when creating the list
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={textfieldRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

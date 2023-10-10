import { useRef, useState } from "react";
// import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";

import { useEffect } from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
// import { describe } from "node:test";
// import { Description } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';



export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
  photoUrl:string;
  // deleteMode: boolean;

};

export default function CardList({ id, name, cards, photoUrl,deleteMode }: CardListProps & { deleteMode: boolean }) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);  // New state for controlling the Dialog's visibility
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
//   const [cardItems, setCardItems] = useState<CardProps[]>(initialCardItems); 
//   const generateID = () => {
//     return Math.random().toString(36).substr(2, 9);
// };



  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedCards(cards.map((card) => card.id));
    } else {
      setSelectedCards([]);
    }
    setSelectAll(!selectAll);
  };
  const handleSelectOne = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(item => item !== id));
    } else {
      setSelected(prev => [...prev, id]);
    }
  };
  // const handleCardSelect = (cardId: string) => {
  //   if (selectedCards.includes(cardId)) {
  //     setSelectedCards(selectedCards.filter((id) => id !== cardId));
  //   } else {
  //     setSelectedCards([...selectedCards, cardId]);
  //   }
  // };
  const handleDeleteSelected = () => {
    if (selected.length > 0) {
      // Perform the delete operation based on the selected IDs
      console.log('Deleting: ', selected);
    
      setSelected([]);
      setConfirmDialog(true);
      // Also update your song list accordingly
    }
    else {
      // No songs selected, show an alert
      alert('請選擇要刪除的歌曲'); // replace this with a more user-friendly UI alert
    }
  };
  const handleAddNewCard = () => {
    setOpenNewCardDialog(true);
};
// const handleNewCardSubmit = (title: string, description: string, youtubelink: string) => {
//   const newCard = { 
//       id: generateID(), 
//       title, 
//       description, 
//       youtubelink  // Ensure your CardProps type definition includes youtubeLink property
//   };

//   setCardItems(prevCardItems => [...prevCardItems, newCard]);
//   setOpenNewCardDialog(false);  // Assuming this state controls the visibility of your dialog
// };


  const handleConfirmDelete = () => {
    // Function to delete the selected cards
    // For example: deleteCards(selectedCards);
    setConfirmDialog(false);
    setSelectedCards([]); // Clear selected cards after deletion
  };


  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);

  

  useEffect(() => {
    // Make an API call to fetch the photoUrl for the specific list
    fetch(`/api/lists/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.photoUrl) {
          // setPhotoUrl(data.photoUrl);
        } else {
          console.error('No photoUrl found in response:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching photoUrl:', error);
      });
  }, [id]);
  

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };
  
  const handlePhotoClick = () => {
    setOpenDialog(true);  // Open the Dialog when the photo is clicked
  };
  

  return ( 
    <>
      <Paper className="w-80 p-6">
        {/* <div className="flex gap-4"> */}
        <div style={{ position: 'relative' }}>  {/* Add this wrapper div */}
      {deleteMode && (
        <IconButton 
          color="error" 
          onClick={handleDelete} 
          style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            transform: 'translate(50%, -50%)'  // Adjust the position as per your need
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
          {photoUrl && (
            // <Link to={`/list/${id}`}>
              <img 
                  src={photoUrl} 
                  alt="List Photo" 
                  className="w-20 h-20 cursor-pointer" 
                  onClick={handlePhotoClick}
              />
            // </Link>
          )}
          {edittingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this list..."
                sx={{ fontSize: "2rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEdittingName(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h4">
                {name}
              </Typography>
            </button>
          )}
          {/* this is the old delete button */}
          {/* <div className="grid place-items-center">
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div> */}
          
        </div>
        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <div className="flex flex-col gap-4">
          <div className="text-center">
            {cards.length} {cards.length === 1 ? "card" : "songs"}
          </div>
          {cards.map((card) => (
            <Card key={card.id} {...card} youtubelink={card.youtubelink} />
          ))}
          <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a card
          </Button>
        </div>
      </Paper>
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />
{/* dialog for the delete prompt */}

<Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
  <DialogTitle>Delete Songs</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Are you sure you want to delete the following songs?
      <ul>
        {selectedCards.map(cardId => {
          const card = cards.find(c => c.id === cardId);
          return <li key={cardId}>{card?.title}</li>
        })}
      </ul>
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmDialog(false)} color="primary">Cancel</Button>
    <Button onClick={handleConfirmDelete} color="secondary">Confirm Delete</Button>
  </DialogActions>
</Dialog>

{/* dialog for showing the list */}
<Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
        <DialogTitle>List Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableBody>
              {cards.map(card => (
                <TableRow key={card.id}>
                  <TableCell padding="checkbox">
                    <Checkbox 
                      checked={selected.includes(card.id)}
                      onChange={() => handleSelectOne(card.id)}
                    />
                  </TableCell>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.description}</TableCell>
                  <TableCell><a href={card.youtubelink} target="_blank" rel="noopener noreferrer">YouTube</a></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectAll} color="primary">Select All</Button>
          <Button onClick={handleDeleteSelected} color="secondary">Delete</Button>
          <Button onClick={handleAddNewCard} color="primary">Add</Button> {/* **ADD THIS BUTTON** */}
        </DialogActions>
      </Dialog>   
    </>
    
  );
}




        
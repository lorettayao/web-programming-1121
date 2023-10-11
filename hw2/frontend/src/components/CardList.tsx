import { useRef, useState } from "react";
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
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import axios from 'axios';


export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];
  photoUrl:string;
  // deleteMode: boolean;

};

type DataType = {
  title: string;
  description: string;
  youtubelink: string;
  // Add other fields as needed
};

export default function CardList({ id, name, cards, photoUrl,deleteMode }: CardListProps & { deleteMode: boolean }) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);  // New state for controlling the Dialog's visibility
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  // const [cardItems, setCards] = useState<Card[]>([]);
  // const [editingName, setEditingName] = useState(false);
  // const [editingDescription, setEditingDescription] = useState(false);
  // const [editingPhoto, setEditingPhoto] = useState(false);
  // const [editingCards, setEditingCards] = useState(false);
  const [title, setTitle] = useState<{ [key: string]: string }>({});
  const [description, setDescription] = useState<{ [key: string]: string }>({});
  const [youtubelink, setYoutubeLink] = useState<{ [key: string]: string }>({});
  

  const {fetchCards, fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefDes = useRef<HTMLInputElement>(null);
  const openLinkInNewTab = (url:string) => {
  window.open(url, '_blank');
  };


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
  const handleDeleteSelected = async () => {
    if (selected.length > 0) {
      try {
        // Perform the delete operation based on the selected IDs
        console.log('確定是否刪除： ', selected);
  
        // Make sure to replace 'your-api-endpoint' with the actual endpoint.
        const response = await axios.delete('your-api-endpoint', { data: { ids: selected } });
  
        if (response.status === 200) {
          console.log('Cards deleted successfully');
        } else {
          console.error('Failed to delete cards:', response);
        }
  
        setSelected([]);
        setConfirmDialog(true);
      } catch (error) {
        console.error('Failed to delete cards', error);
        alert('Failed to delete cards');  // Showing error alert
      }
    } else {
      // No songs selected, show an alert
      alert('請選擇要刪除的歌曲'); // Replace this with a more user-friendly UI alert
    }
  };
  
  const handleAddNewCard = () => {
    setOpenNewCardDialog(true);
  };
  


  const handleConfirmDelete = () => {
    // Function to delete the selected cards
    // For example: deleteCards(selectedCards);
    setConfirmDialog(false);
    setSelectedCards([]); // Clear selected cards after deletion
  };


  // const { fetchLists } = useCards();

  

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

  const [data, setData] = useState<DataType>({
    title: '',
    description: '',
    youtubelink: ''
});
const updateData = async (id: string, updatedData: Partial<DataType>) => {
  console.log(`Updating data for id: ${id}, data:`, updatedData);
  try {
    // Replace 'http://localhost:8000/api' with your actual base URL
    const response = await axios.put(`http://localhost:8000/api/${id}`, updatedData); 
    if (response.status === 200) {
      console.log('Data updated successfully');
    } else {
      console.error('Failed to update data:', response);
    }
  } catch (error) {
    console.error('Error during API call:', error);
  }
};



const handleUpdateField = async (
  id: string, 
  field: keyof DataType, 
  value: string
) => {
  if (value && value.trim() === "") {
      alert(`Error: ${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`);
      return;
  }

  try {
      await updateData(id, { [field]: value });
      fetchData();

      
  } catch (error) {
      alert(`Error: Failed to update ${field}`);
  }
};


const fetchData = () => {
  // Implement the logic to fetch updated data from the backend
  console.log('Fetching updated data');
};

useEffect(() => {
  if (openDialog) {
      // Populate initial state when dialog opens
      const initialTitle: { [key: string]: string } = {};
      const initialDescription: { [key: string]: string } = {};
      const initialYoutubeLink: { [key: string]: string } = {};

      cards.forEach(card => {
          initialTitle[card.id] = card.title;
          initialDescription[card.id] = card.description;
          initialYoutubeLink[card.id] = card.youtubelink;
      });

      setTitle(initialTitle);
      setDescription(initialDescription);
      setYoutubeLink(initialYoutubeLink);
  }
}, [openDialog, cards]);



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
  
  interface Card {
    id: string;
    title: string;
    description: string;
    youtubelink: string;
    // add other fields as necessary
}

const handleEditFieldChange = (
    cardId: string, 
    field: keyof Card, 
    value: string, 
    currentCards: Card[], 
    updateCards: React.Dispatch<React.SetStateAction<Card[]>>
) => {
    const updatedCards = currentCards.map(card => 
        card.id === cardId ? {...card, [field]: value} : card
    );
    
    updateCards(updatedCards);
};

const handleUpdateCard = async (
  cardId: string, 
  field: keyof Card, 
  value: string, 
  currentCards: Card[], 
  updateCards: React.Dispatch<React.SetStateAction<Card[]>>
) => {
  try {
      const response = await fetch(`/api/cards/${cardId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({[field]: value}),
      });

      if (!response.ok) {
        console.log("ID???",cardId);
          throw new Error(`Failed to update the card: ${response.statusText}`);

      }

      const updatedCards = currentCards.map(card =>
          card.id === cardId ? {...card, [field]: value} : card
      );
      updateCards(updatedCards);

      console.log('Card updated successfully');
  } catch (error) {
      console.error('There was an error updating the card!', error);
  }
};
const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.checked) {
      const newSelecteds = cards.map((card) => card.id);
      setSelected(newSelecteds);
      setSelectAll(true);
      return;
  }
  setSelected([]);
  setSelectAll(false);
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
          <div style={{ visibility: 'hidden' }}>
          {cards.map((card) => (
            <Card key={card.id} {...card} youtubelink={card.youtubelink} />
          ))}
          </div>
          
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
    <DialogContent>
        <h1>{name}</h1>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < cards.length}
                      checked={cards.length > 0 && selected.length === cards.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ 'aria-label': 'select all' }}
                    />
                    </TableCell>
                    <TableCell>Song</TableCell>
                    <TableCell>Singer</TableCell>
                    <TableCell>Link</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cards.map(card => (
                    <TableRow key={card.id}>
                        <TableCell padding="checkbox">
                            <Checkbox 
                                checked={selected.includes(card.id)}
                                onChange={() => handleSelectOne(card.id)}
                            />
                        </TableCell>
                        <TableCell>
                            <ClickAwayListener 
                                onClickAway={() => handleUpdateField(card.id, 'title', title[card.id])}
                            >
<TextField
    value={title[card.id] || card.title}  // Ensure it falls back to card.title if title[card.id] is undefined
    onChange={(e) => setTitle(prev => ({ ...prev, [card.id]: e.target.value }))}
    fullWidth
/>
                            </ClickAwayListener>
                        </TableCell>
                        <TableCell>
                            <ClickAwayListener 
                                onClickAway={() => handleUpdateField(card.id,'description', description[card.id] || card.description)}
                            >
                                <TextField
            value={description[card.id] || card.description}
            onChange={(e) => setDescription(prev => ({ ...prev, [card.id]: e.target.value }))}
            fullWidth
        />
                            </ClickAwayListener>
                        </TableCell>
                        <TableCell>
                            <ClickAwayListener 
                                onClickAway={() => handleUpdateField(card.id,'youtubelink', youtubelink[card.id] || card.youtubelink)}
                            >
                                <a href={youtubelink[card.id] || card.youtubelink} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
            <TextField
                value={youtubelink[card.youtubelink] || card.youtubelink}
                onChange={(e) => setYoutubeLink(prev => ({ ...prev, [card.id]: e.target.value }))}
                fullWidth
            />
        </a>
                            </ClickAwayListener>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </DialogContent>
    <DialogActions>
        
        {/* <Button onClick={handleDeleteSelected} color="secondary">Delete</Button> */}
        <Button
            variant="contained"
            onClick={() => handleDeleteSelected()}
          >
            <AddIcon className="mr-2" />
            delete
          </Button>
        <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a song
          </Button>
    </DialogActions>
</Dialog>   
  
    </>
    
  );
}




        
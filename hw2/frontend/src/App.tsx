import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import ListDetailPage from "./components/ListDetailPage";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <Router>
      <HeaderBar />
      <main className="mx-auto px-6 sm:px-12 lg:px-24 py-12">
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-2xl font-bold">My Playlist</div>
          <div>
            <Button
              variant="contained"
              className="w-40 mr-2"
              onClick={() => setNewListDialogOpen(true)}
            >
              <AddIcon className="mr-2" />
              Add a list
            </Button>
            <Button
              variant="contained"
              className="w-40"
              onClick={() => setDeleteMode(!deleteMode)}
            >
              <AddIcon className="mr-2" />
              {deleteMode ? 'Done' : 'Delete'}
            </Button>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-6 justify-start">
          {lists.map((list) => (
            <CardList key={list.id} {...list} deleteMode={deleteMode} />
          ))}
        </div>
      </main>
      <NewListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
      />
      <Routes>
        <Route path="/list/:id" element={<ListDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;

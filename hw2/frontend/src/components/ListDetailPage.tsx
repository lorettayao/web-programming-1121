import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';  

interface ListType {
  id: string;
  name: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  // include other properties as needed
}

function ListDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ListType | null>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<any>(null);  

  useEffect(() => {
    if (!id) return;  // Add this check to ensure id is available before fetching

    axios.get(`/api/lists/${id}`)
      .then(response => {
        setList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error retrieving the data!", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading list details...</p>;
  }

  if (error) {
    return <p>Error loading list details!</p>;
  }

  if (!list) {
    return <p>List not found!</p>;
  }

  return (
    <div>
      <h1>List: {list.name}</h1>
      <p>ID: {id}</p>
      <ul>
        {list.items.map(item => (
          <li key={item.id}>{item.name} - {item.description}</li>
        ))}
      </ul>
      {/* You can add more detailed information about the list here */}
    </div>
  );
}

export default ListDetailPage;

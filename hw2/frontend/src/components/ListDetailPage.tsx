import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './ListDetailPage.css'; // Import CSS file here

interface ListType {
  id: string;
  name: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

const ListDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [list, setList] = useState<ListType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

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

  if (loading) return <p>Loading list details...</p>;
  if (error) return <p>Error loading list details!</p>;
  if (!list) return <p>List not found!</p>;

  return (
    <div className="list-detail-container">
      <h1 className="list-title">{list.name}</h1>
      <p className="list-id">ID: {id}</p>
      <ul className="list-items">
        {list.items.map(item => (
          <li key={item.id} className="item">
            {item.name} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListDetailPage;

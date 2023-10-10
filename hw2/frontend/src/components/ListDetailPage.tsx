// ListDetailPage.tsx

import { useParams } from 'react-router-dom';

function ListDetailPage() {
  const { id } = useParams(); // Get the id parameter from the route

  // Fetch data for the list using the 'id' if needed
  // You can use this 'id' to fetch the corresponding list data

  return (
    <div>
      <h2>List Details</h2>
      <p>List ID: {id}</p>
      {/* Display other details of the list */}
    </div>
  );
}

export default ListDetailPage;

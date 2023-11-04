import { useState } from 'react';
import { useRouter } from 'next/router';

console.log("hello from useName.ts");
export default function useName() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const getUsername = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/users}`, {
        method: 'GET',
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error);
      }

      const data = await res.json();
      setUsername(data.username);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    // Assuming there's a need to refresh the router after getting the username
    // router.refresh(); // Uncomment this if you need to refresh the page after the API call
  };

  return {
    getUsername,
    username,
    loading,
    error,
  };
}

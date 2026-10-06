import { useState, useEffect } from 'react';

export default function Commits() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/commits.json")
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Activité GitHub</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '10px' }}>
            <strong>{event.type}</strong> sur le dépôt : <code>{event.payload.description}</code>
            <br />
            <small>Date : {new Date(event.created_at).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

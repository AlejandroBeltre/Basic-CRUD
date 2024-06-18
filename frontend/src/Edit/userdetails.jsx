import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../api';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => console.error("Error fetching user by ID:", error));
  }, [id]);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserDetails;
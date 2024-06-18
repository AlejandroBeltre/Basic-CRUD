import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default UserDetails;
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, name: 'User 1', email: 'user1@example.com', image: '' },
    { id: 2, name: 'User 2', email: 'user2@example.com', image: '' },
    { id: 3, name: 'User 3', email: 'user3@example.com', image: '' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    image: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUser({
          ...newUser,
          image: reader.result,
        });
      };
      reader.readAsDataURL(file); // Convert image file to base64
    }
  };

  const addUser = () => {
    const { name, email, image } = newUser;
    if (name && email) {
      const newId = users.length ? Math.max(users.map(user => user.id)) + 1 : 1; // Find highest ID
      setUsers([...users, { id: newId, ...newUser }]);
      setNewUser({ name: '', email: '', image: '' }); // Reset form
    }
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user) => {
    setNewUser(user);
    setIsEditing(true);
    setEditUserId(user.id);
  };

  const updateUser = () => {
    if (isEditing) {
      setUsers(users.map(user => (user.id === editUserId ? { ...user, ...newUser } : user)));
      setNewUser({ name: '', email: '', image: '' });
      setIsEditing(false);
      setEditUserId(null);
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Form to add or edit user */}
      <div className="add-user-form">
        <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {newUser.image && <img src={newUser.image} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
        <button onClick={isEditing ? updateUser : addUser}>
          {isEditing ? 'Update User' : 'Add User'}
        </button>
      </div>

      {/* Display user list */}
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {user.image && <img src={user.image} alt="User" style={{ width: '50px', height: '50px' }} />}
              </td>
              <td>
                <FaEdit onClick={() => editUser(user)} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} />
                <FaTrash onClick={() => deleteUser(user.id)} style={{ cursor: 'pointer', color: 'red' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

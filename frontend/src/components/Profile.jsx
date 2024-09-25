import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const url = "http://localhost:4000"
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    avatar: null, // for new image upload
  });

  const navigate = useNavigate()

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedUser = JSON.parse(localStorage.getItem('currentUser')); // Get user data from localStorage
    if (storedUser) {
      setUser(storedUser); // Set user data to state
      setEditData({ name: storedUser.name, email: storedUser.email, avatar: null });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value, // handle avatar file separately
    }));
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', editData.name);
    formData.append('email', editData.email);
    if (editData.avatar) {
      formData.append('avatar', editData.avatar);
    }

    try {
      const response = await axios.patch(`${url}/api/update-profile/`, formData);
        console.log(response)
      const updatedUser = response.data

      // Update localStorage and component state
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false); // Turn off edit mode
      navigate('/profile')
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center relative">
        {/* Edit Button */}
        <button
          onClick={handleEditClick}
          className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>

        {/* Avatar */}
        <img
          src={user.avatar || 'https://via.placeholder.com/150'} // Fallback image
          alt="User Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        {isEditing ? (
          <form>
            {/* Editable Name */}
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* Editable Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* Upload New Avatar */}
            <div className="mb-4">
              <input
                type="file"
                name="avatar"
                onChange={handleInputChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 w-full"
            >
              Save
            </button>
          </form>
        ) : (
          <>
            {/* Display Name */}
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Name: {user.name}</h2>

            {/* Display Email */}
            <p className="text-gray-600">email: {user.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

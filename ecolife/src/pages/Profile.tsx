// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Ensure the db import is correct
import { useAuth } from '../AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const profileDoc = doc(db, 'profiles', currentUser.uid);
        const profileSnapshot = await getDoc(profileDoc);
        if (profileSnapshot.exists()) {
          setProfile(profileSnapshot.data() as { name: string, email: string, phone: string });
        }
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    fetchProfile();
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    if (currentUser) {
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      await setDoc(profileDoc, profile);
      setIsEditing(false);
    }
  };

  const handleUpdate = async () => {
    if (currentUser) {
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      const profileSnapshot = await getDoc(profileDoc);
      if (profileSnapshot.exists()) {
        await updateDoc(profileDoc, profile);
      } else {
        await setDoc(profileDoc, profile);
      }
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (currentUser) {
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      await deleteDoc(profileDoc);
      setProfile({ name: '', email: '', phone: '' });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    
    <div className="profile-container">
      <h1>Profile</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Profile;

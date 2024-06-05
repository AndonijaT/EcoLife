// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Ensure the db import is correct
import { useAuth } from '../AuthContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // This imports and registers the required Chart.js components
import './Profile.css';
import './Navbar.css'; 


const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const profileDoc = doc(db, 'profiles', currentUser.uid);
        const profileSnapshot = await getDoc(profileDoc);
        if (profileSnapshot.exists()) {
          setProfile(profileSnapshot.data() as { name: string, email: string, phone: string });
        }
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [currentUser]);

  useEffect(() => {
    const fetchResults = async () => {
      if (currentUser) {
        const resultsQuery = query(
          collection(db, 'quizResults'),
          where('userId', '==', currentUser.uid),
          orderBy('date')
        );
        const querySnapshot = await getDocs(resultsQuery);
        const resultsData = querySnapshot.docs.map(doc => doc.data());
        setResults(resultsData);
      }
    };
    fetchResults();
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
    return <div>Loading...</div>;
  }

  const data = {
    labels: results.map(result => new Date(result.date.seconds * 1000).toLocaleDateString()),
    datasets: [
      {
        label: 'Sustainability Score',
        data: results.map(result => result.score),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/tracking">Tracking</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/articles">Articles</a></li>
          <li><a href="/quiz">Quiz</a></li>
        </ul>
      </nav>
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
      <h2>Quiz Results</h2>
      {results.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No quiz results available.</p>
      )}
    </div>
  );
};

export default Profile;
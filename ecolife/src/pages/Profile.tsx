import React, { useState, useEffect } from 'react';
import { doc, setDoc, updateDoc, deleteDoc, collection, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig'; // Ensure the db and storage imports are correct
import { useAuth } from '../AuthContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // This imports and registers the required Chart.js components
import './Profile.css';
import './Navbar.css'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', picture: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const profileDocRef = doc(db, 'profiles', currentUser.uid);
      const unsubscribe = onSnapshot(profileDocRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data() as { name: string, email: string, phone: string, picture: string };
          setProfile(data);
          setShowPopup(!data.name || !data.email || !data.phone);
        } else {
          setShowPopup(true);
        }
        setIsLoading(false);
      });

      return () => unsubscribe();
    }
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const uploadProfilePicture = async () => {
    if (file && currentUser) {
      const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    }
    return profile.picture; // Return the existing picture URL if no new file is uploaded
  };

  const handleSave = async () => {
    if (currentUser) {
      const pictureUrl = await uploadProfilePicture();
      const updatedProfile = { ...profile, picture: pictureUrl };
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      await setDoc(profileDoc, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const handleUpdate = async () => {
    if (currentUser) {
      const pictureUrl = await uploadProfilePicture();
      const updatedProfile = { ...profile, picture: pictureUrl };
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      await updateDoc(profileDoc, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (currentUser) {
      const profileDoc = doc(db, 'profiles', currentUser.uid);
      await deleteDoc(profileDoc);
      setProfile({ name: '', email: '', phone: '', picture: '' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login'; // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
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
        <div className="navbar-toggle" onClick={() => setMenuActive(!menuActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-links ${menuActive ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/tracking">Tracking</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/articles">Articles</a></li>
          <li><a href="/quiz">Quiz</a></li>
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
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
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div>
          {profile.picture && <img src={profile.picture} alt="Profile" className="profile-pic" />}
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

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Please fill in the missing data</h2>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

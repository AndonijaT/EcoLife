import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, query, orderBy, getDocs, Timestamp, doc, getDoc } from 'firebase/firestore';
import './Leaderboard.css';

interface QuizResult {
  date: Timestamp;
  userId: string;
  score: number;
  userName?: string; // Optional userName field
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardQuery = query(
        collection(db, 'quizResults'),
        orderBy('date', 'desc') // Order by date to ensure we get the latest results first
      );
      const querySnapshot = await getDocs(leaderboardQuery);
      const leaderboardData = querySnapshot.docs.map(doc => doc.data() as QuizResult);

      // Filter out to get only the latest score for each user
      const latestScores: { [userId: string]: QuizResult } = {};
      leaderboardData.forEach(result => {
        if (!latestScores[result.userId] || latestScores[result.userId].date < result.date) {
          latestScores[result.userId] = result;
        }
      });

      const latestScoresArray = Object.values(latestScores).sort((a, b) => b.score - a.score).slice(0, 10);

      // Fetch user names for the top scores
      const leaderboardWithNames = await Promise.all(latestScoresArray.map(async (result) => {
        try {
          const userDocRef = doc(db, 'profiles', result.userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            result.userName = userDoc.data().name;
          } else {
            result.userName = result.userId; // Fallback to userId if name is not found
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          result.userName = result.userId; // Fallback to userId in case of an error
        }
        return result;
      }));

      setLeaderboard(leaderboardWithNames);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="podium">
        {leaderboard.slice(0, 3).map((result, index) => (
          <div key={index} className={`podium-item position-${index + 1}`}>
            <div className="podium-rank">{index + 1}</div>
            <div className="podium-user">User: {result.userName}</div>
            <div className="podium-score">Score: {result.score}</div>
          </div>
        ))}
      </div>
      <ol className="leaderboard-list">
        {leaderboard.slice(3).map((result, index) => (
          <li key={index + 3}>
            User: {result.userName} - Score: {result.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;

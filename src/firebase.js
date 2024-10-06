import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'tetsu19n1101087-game.firebaseapp.com',
  projectId: 'tetsu19n1101087-game',
  storageBucket: 'tetsu19n1101087-game.appspot.com',
  messagingSenderId: '185656087503',
  appId: '1:185656087503:web:093adaf1610fe4798278ba',
};

const app = initializeApp(firebaseConfig);
import React from 'react';
import Navigator from './src/navigation/Navigator';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return <HomeScreen displayLoginForm={false} displaySignupForm={false} />;
}

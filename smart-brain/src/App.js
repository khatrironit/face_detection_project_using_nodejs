import React from 'react';
//import logo from './logo.svg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Logo />
      <ImageLinkForm />
      {/* {<FaceDetection />}} */}
    </div>
  );
}

export default App;

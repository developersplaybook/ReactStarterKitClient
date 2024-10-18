import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Frame from './components/navbar/Frame';
import Home from './components/home/Home';
import Albums from './components/albums/Albums';
import Photos from './components/photos/Photos';
import LoginOutForm from './components/user/LoginOutForm';
import PhotoDetails from './components/photodetails/PhotoDetails';
import NotFound from './components/NotFound';
import { GlobalStateProvider } from './components/contexts/GlobalStateContext';

const App = () => {
  return (
    <GlobalStateProvider>
        <BrowserRouter>
          <Frame>
            <Routes>
              {/* Exact path for Home */}
              <Route path="/" element={<Home />} />
              
              {/* Non-exact paths */}
              <Route path="/albums" element={<Albums />} />
              <Route path="/photos/:albumId" element={<Photos />} />
              <Route path="/photodetails/:photoId" element={<PhotoDetails />} />
              <Route path="/user" element={<LoginOutForm />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Frame>
        </BrowserRouter>
    </GlobalStateProvider>
  );
};

export default App;

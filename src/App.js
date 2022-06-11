import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/pages/About';
import Notes from './components/Notes';
import Layout from './components/Layout';
import NoteState from './context/notes/NoteState';
import { ToastContainer } from 'react-toastify';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';

const App = () => {
  return (
    <>
      <NoteState>
        <ToastContainer
          role="alert"
          theme="dark"
          newestOnTop
          position="bottom-right"
          autoClose={2000}
        />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Notes />} />
              <Route path="about" index element={<About />} />
              <Route path="login" index element={<Login />} />
              <Route path="signup" index element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
};
export default App;

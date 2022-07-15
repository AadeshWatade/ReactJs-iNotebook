import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/pages/About';
import Notes from './components/Notes';
import Layout from './components/Layout';
import NoteState from './context/notes/NoteState';
import { ToastContainer } from 'react-toastify';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import noteContext from './context/notes/noteContext';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('');
  const context = useContext(noteContext);
  const current_theme = context;
  useEffect(() => {
    const getData = async () => {
      const response = await current_theme();
      setCurrentTheme(response.data?.['current_theme']);
      localStorage.setItem('current_theme', response.data?.['current_theme']);
    };
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <main className={currentTheme}>
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
    </main>
  );
};
export default App;

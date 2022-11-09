import React, { useState } from 'react';
import noteContext from './noteContext';

const NoteState = ({ children }) => {
  const host = 'http://localhost:5000';
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [user, setUser] = useState([]);

  // Fetch all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('loginToken'),
      },
    });
    const json = await response.json();
    setUser(json);
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
        user,
        getUser,
      }}>
      {children}
    </noteContext.Provider>
  );
};

export default NoteState;

import React, { useContext, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
    toast.success('Note added successfully!');
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <p className="flex flex-row mb-6 text-3xl">
        <AiFillFileAdd className="my-auto mx-2" /> Add a Note!
      </p>
      <form className="flex flex-col -mx-20 md:mx-1">
        <label htmlFor="title">Title</label>
        <input
          value={note.title}
          required
          minLength={5}
          type="text"
          name="title"
          onChange={onChange}
          id="title"
          placeholder="Title (min 5 characters)"
          className="border text-white p-2 my-2 mb-6 bg-transparent focus:border-primary"
        />
        <label htmlFor="description">Description</label>
        <div className="text-black my-2 mb-6">
          <CKEditor
            editor={ClassicEditor}
            data={note.description}
            onReady={(editor) => {
              console.log('Editor is ready to use!');
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              note.description = data;
              console.log(note.description);
            }}
          />
        </div>
        {/* <textarea
          value={note.description}
          required
          minLength={5}
          type="text"
          name="description"
          onChange={onChange}
          id="description"
          placeholder="Description (min 5 characters)"
          className="border text-white p-2 my-2 mb-6 bg-transparent"
        /> */}
        <label htmlFor="tag">Tag</label>
        <input
          list="tags"
          value={note.tag}
          type="text"
          name="tag"
          onChange={onChange}
          id="tag"
          placeholder="Enter a Tag"
          className="border text-white p-2 my-2 bg-transparent"
        />
        <datalist id="tags">
          <option value="public" />
          <option value="personal" />
        </datalist>
        <button
          disabled={note.title.length <= 4 || note.description.length <= 4}
          onClick={handleSubmit}
          type="submit"
          className="bg-primary text-black flex place-self-end justify-center w-24 rounded-md p-1 disabled:cursor-not-allowed">
          &#x2B; Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;

import React, { useContext, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import ToolTip from './common/ToolTip';

const AddNote = ({ uniqueCategories, inputRef, selectedColor }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
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
      <p className="flex flex-row mb-6 text-xl md:text-3xl justify-center md:justify-start">
        <AiFillFileAdd className="my-auto md:mx-2" /> Add a Note!
      </p>
      <form className="flex flex-col -mx-20 md:mx-1">
        <label htmlFor="title">Title</label>
        <input
          ref={inputRef}
          value={note.title}
          required
          minLength={5}
          type="text"
          name="title"
          onChange={onChange}
          id="title"
          placeholder="Title (min 5 characters)"
          className={`border ${selectedColor === 'dark' ? 'text-white' : 'border-black text-black'}  p-2 my-2 mb-6 bg-transparent focus:border-primary`}
        />
        <div className="flex flex-row justify-between">
          <label htmlFor="description">Description</label>
          {listening ? (
            <>
              <IoMdMicOff
                data-tip
                data-for="micStop"
                className="bg-red-400 text-black p-1 text-3xl transition-all duration-500 cursor-pointer"
                onClick={() => {
                  SpeechRecognition.stopListening({ continuous: true });
                  note.description = transcript;
                  resetTranscript();
                }}
              />
              <ToolTip id="micStop" place="top" title="Stop" />
            </>
          ) : (
            <>
              <IoMdMic
                data-tip
                data-for="micStart"
                className="bg-primary text-black p-1 text-3xl rounded-sm transition-all duration-500 cursor-pointer"
                onClick={() => {
                  SpeechRecognition.startListening({ continuous: true });
                }}
              />
              <ToolTip id="micStart" place="top" title="Tap to speak" />
            </>
          )}
        </div>
        <p className="text-gray-400">{transcript}</p>
        <div className="text-black my-2 mb-6">
          <CKEditor
            config={{
              toolbar: {
                items: [
                  'heading',
                  '|',
                  'bold',
                  'italic',
                  'bulletedList',
                  'numberedList',
                  'blockQuote',
                ],
              },
            }}
            editor={ClassicEditor}
            data={note.description}
            onReady={(editor) => {
              console.log('Editor is ready to use!');
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // note.description = data;
              setNote(prev => ({ ...prev, description: data }));
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
          className={`border ${selectedColor === 'dark' ? 'text-white' : 'border-black text-black'}  p-2 my-2 bg-transparent`}
        />
        <datalist id="tags">
          {uniqueCategories.map((categories) => (
            <option key={categories} value={categories} />
          ))}
        </datalist>
        <button
          data-tip
          data-for='addButton'
          disabled={note.title.length <= 4 || note.description.length <= 4}
          onClick={handleSubmit}
          type="submit"
          className="bg-primary text-black flex place-self-end justify-center w-24 rounded-md p-1 disabled:cursor-not-allowed disabled:opacity-60">
          &#x2B; Add Note
        </button>
      </form>
    </>
  );
};

export default AddNote;

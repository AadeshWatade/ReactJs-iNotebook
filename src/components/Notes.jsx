import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Dialog, Listbox, Transition } from '@headlessui/react';

import { IoCloseCircle, IoSearch } from 'react-icons/io5';
import { GoKebabVertical } from 'react-icons/go';
import { RiFileEditFill } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';

import AddNote from './AddNote';
import NoteItem from './NoteItem';
import noteContext from '../context/notes/noteContext';
import ToolTip from './common/ToolTip';
import ScrollToTop from './common/ScrollToTop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import InfiniteScroll from 'react-infinite-scroll-component'
import Loader from './common/Loader';
import { themeContext } from '../context/theme/theme';




const Notes = () => {
  const context = useContext(noteContext);
  const [searchText, setSearchText] = useState('');
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  const ref = useRef(null);
  const refClose = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [note, setNote] = useState({
    id: '',
    etitle: '',
    edescription: '',
    etag: '',
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('loginToken')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    refClose.current.click();
    toast.success('Note updated successfully!');
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const categories = notes.map((note) => note.tag).reverse();
  const uniqueCategories = [...new Set(categories)];
  const [selected, setSelected] = useState(categories[0]);
  const [tagValue, setTagValue] = useState(null);

  // const limit = 4;

  // const [noteData, setNoteData] = useState(notes.slice(0, limit));
  // const [visible, setVisible] = useState(limit);
  // const [hasMore, setHasMore] = useState(true);

  // const fetchData = () => {
  //   const newLimit = visible + limit;
  //   const dataToAdd = notes.slice(visible, newLimit);

  //   if (notes.length > noteData.length) {
  //     setTimeout(() => {
  //       setNoteData([...noteData].concat(dataToAdd))
  //     }, 2000);
  //     setVisible(newLimit)
  //   } else {
  //     setHasMore(false)
  //   }
  // }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {

      inputRef.current.focus()
    }, 1000);
  };
  useEffect(() => {
    document.title = `iNotebook - Home`
    // eslint-disable-next-line
  }, [])
  const themeS = useContext(themeContext)
  const { selectedColor } = themeS
  console.log(selectedColor)
  return (
    <div className={`py-16 px-32 ${selectedColor === 'dark' ? 'bg-background text-white' : 'bg-lightBackground text-navbar'}`}>
      <AddNote uniqueCategories={uniqueCategories} inputRef={inputRef} selectedColor={selectedColor} />
      <button ref={ref} type="button" onClick={openModal} className="hidden">
        Open dialog
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="font-poppins fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm transition-all duration-300 bg-[#000000a2]"
          onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className={`inline-block ${selectedColor === 'dark' ? 'bg-[#020202] text-white' : 'bg-lightBackground text-black'} text-white w-full border border-primary max-w-lg shadow-primary p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-lg rounded-2xl`}>
                <Dialog.Title
                  as="h3"
                  className="text-2xl my-3 font-medium leading-6 text-primary text-center">
                  Edit Note
                  <button
                    className="absolute right-0 pr-3 -mt-6 text-3xl"
                    ref={refClose}
                    onClick={closeModal}>
                    <IoCloseCircle />
                  </button>
                </Dialog.Title>
                <form className="flex flex-col">
                  <label htmlFor="etitle">Title</label>
                  <input
                    required
                    minLength={5}
                    type="text"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    id="etitle"
                    placeholder="Enter a Title"
                    className="border p-2 mb-4 text-black"
                  />
                  <span className="text-black">
                    <label className="" htmlFor="edescription">
                      Description
                    </label>
                    {/* <textarea
                    required
                    minLength={5}
                    type="text"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    id="edescription"
                    placeholder="Enter Description"
                    className="border p-2 mb-4 text-black"
                  /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={note.edescription}
                      onReady={(editor) => {
                        console.log('Editor is ready to use!');
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        note.edescription = data;
                      }}
                    />
                  </span>
                  <label className='mt-3' htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    id="etag"
                    placeholder="Enter a Tag"
                    className="border p-2 mb-4 text-black"
                  />
                </form>

                <div className="mt-4 space-x-2 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-background hover:text-primary text-white border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleClick}>
                    <AiOutlineEdit className="my-auto text-lg mr-2 text-primary" />
                    Update Note
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <ScrollToTop goToTop={goToTop} />

      <div className="flex flex-row mt-16 mb-6 justify-between -mx-20 md:mx-3">
        <p className="text-sm md:text-xl lg:text-2xl flex flex-row my-auto">
          <RiFileEditFill className="my-auto mx-2" /> Your Notes
        </p>
        <div className="flex flex-row relative">
          <IoSearch className="absolute text-primary text-lg md:text-2xl top-1.5 md:top-1 left-1" />
          <input
            className={`bg-transparent ${selectedColor !== 'dark' && 'border-black'} p-1 border rounded-full pl-9 text-xs md:text-sm w-36 md:w-auto max-h-8 my-auto`}
            id="input"
            label="Search"
            placeholder='"Search in notes"'
            onChange={(event) => setSearchText(event.target.value)}
          />
          <div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="cursor-default rounded-lg ml-2 bg-transparent h-full px-2 text-left focus:outline-none sm:text-sm">
                  <GoKebabVertical
                    data-tip
                    data-for="tags"
                    className="my-auto text-xl "
                  />
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options className={`absolute mt-1 ${selectedColor === 'dark' ? 'text-white' : 'text-black'} z-10 overflow-auto right-2 rounded-md bg-transparent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm shadow-primary`}>
                    {uniqueCategories.map((categories) => (
                      <Listbox.Option
                        key={categories}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${active ? 'text-primary' : 'text-white'
                          }`
                        }
                        value={categories}>
                        {({ selected }) => (
                          <>
                            <span
                              onClick={(e) => {
                                setTagValue(categories);
                                setSearchText('')
                                console.log(tagValue);
                              }}
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                } ${selectedColor === 'dark' ? 'text-white' : 'text-black'}`}>
                              {categories}
                            </span>
                            {selected ? '' : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <ToolTip id="tags" place="top" title="Sort by Tags" />
        </div>
      </div>
      {loading ? <Loader /> : <>
        {searchText ? (
          <p className="text-xl text-gray-500 text-center">
            Showing search results for "<i>{searchText}</i>"...
          </p>
        ) : (
          ''
        )}
        {/* <InfiniteScroll
        dataLength={noteData.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader />}
      > */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto mx-2 my-3">
          {notes
            .filter((note) => {
              if (searchText === '') {
                return (
                  <NoteItem selectedColor={selectedColor} key={note._id} updateNote={updateNote} note={note} />
                );
              } else if (
                note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                note.description
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                note.tag.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return (
                  <NoteItem selectedColor={selectedColor} key={note._id} updateNote={updateNote} note={note} />
                );
              }
            })
            .map((note) => {
              return (
                <NoteItem selectedColor={selectedColor} key={note._id} updateNote={updateNote} note={note} />
              );
            })
            .reverse()}
        </div>
        {notes.length === 0 && <p className="p-8">Wow, such empty :(</p>}

      </>}
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default Notes;

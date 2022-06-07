import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useRef, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';

import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);

  const { note, updateNote } = props;
  const { deleteNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-sm transition-all duration-300 bg-[#000000b9]"
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
              <div className="inline-block bg-[#020202] text-white w-full border border-primary max-w-lg shadow-primary p-6 my-8 overflow-hidden text-left align-middle transition-all transform shadow-lg rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-2xl my-3 font-medium leading-6 text-center">
                  {note.title}
                  <button
                    className="absolute right-0 pr-3 -mt-6 text-3xl text-primary"
                    ref={refClose}
                    onClick={closeModal}>
                    <IoCloseCircle />
                  </button>
                </Dialog.Title>
                <div className="flex flex-col justify-between">
                  {note.tag ? (
                    <p className="w-fit text-xs text-primary mb-4 py-1 px-2 border border-primary rounded-2xl">
                      {note.tag}
                    </p>
                  ) : (
                    ''
                  )}
                  <p className="">{note.description} </p>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <div className=" border border-primary p-3 rounded-md shadow-md hover:scale-105 hover:shadow-primary transition-all duration-200 hover:shadow-md -mx-20 md:mx-1">
        <div className="flex flex-row justify-between">
          <p className="text-xl font-semibold">{note.title}</p>
          <section className="flex space-x-4">
            <MdEdit
              onClick={() => {
                updateNote(note);
              }}
              className="text-yellow-500 hover:scale-150 cursor-pointer"
            />

            <MdDelete
              onClick={() => {
                deleteNote(note._id);
                toast.success('Note deleted successfully!');
              }}
              className="text-red-500 hover:scale-150 cursor-pointer"
            />
          </section>
        </div>
        <div ref={ref} onClick={openModal} className="cursor-pointer">
          {note.tag ? (
            <p className="text-xs bg-primary inline-block mb-4 py-1 px-2 text-white rounded-2xl">
              {note.tag}
            </p>
          ) : (
            ''
          )}
          <p className="line-clamp-2">{note.description} </p>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
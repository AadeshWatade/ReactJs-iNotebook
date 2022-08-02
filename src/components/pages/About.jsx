import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = `iNotebook - About`
    // eslint-disable-next-line
  }, [])
  return (
    <div className="bg-background h-screen text-white px-16 py-4">
      <br />
      <br />
      Hi, This is Aadesh Watade!
      <br />
      <br />
      iNotebook is a web application for adding, updating and deleting notes  with cool additional features like text-to-speech, searching, etc.
      <br />
      It is a MERN Stack Single Page Application.
      <br />
      <br />
      iNotebook fetches user specific notes and is a very secure web app with login, signup functionality.
    </div>
  );
};

export default About;

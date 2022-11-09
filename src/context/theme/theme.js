import { createContext, useState } from 'react';

export const themeContext = createContext({
  selectedColor: null,
  onColorChange: (newColor) => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [color, setColor] = useState('dark');

  const handleColorChange = (c) => {
    setColor(c);
  };
  const contextValue = {
    selectedColor: color,
    onColorChange: handleColorChange,
  };
  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
};

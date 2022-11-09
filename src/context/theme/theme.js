import { createContext, useState } from 'react';

export const themeContext = createContext({
  currentTheme: null,
  onThemeChange: (newColor) => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [color, setColor] = useState('dark');

  const handleColorChange = (c) => {
    setColor(c);
  };
  const contextValue = {
    currentTheme: color,
    onThemeChange: handleColorChange,
  };
  return (
    <themeContext.Provider value={contextValue}>
      {children}
    </themeContext.Provider>
  );
};

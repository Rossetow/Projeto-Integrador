import React, { ReactNode, createContext, useState } from "react";

type ThemeContextProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
);

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
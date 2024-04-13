// src/components/TextEnlarger.client.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface TextSizeContextType {
  textSize: number;
  setTextSize: Dispatch<SetStateAction<number>>;  // This type supports both number and functions returning a number
}

const TextSizeContext = createContext<TextSizeContextType>({
  textSize: 16, // Default base text size
  setTextSize: () => {}, // Placeholder function
});

interface TextSizeProviderProps {
  children: ReactNode;
}

export const TextSizeProvider = ({ children }: TextSizeProviderProps) => {
  const [textSize, setTextSize] = useState<number>(16);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

// Component to use the context and provide a button to enlarge text
const TextEnlarger = () => {
  const { setTextSize } = useContext(TextSizeContext);

  const handleTextEnlarge = () => {
    setTextSize((currentSize: number) => currentSize + 5); // Correctly typed
  };

  return (
    <button onClick={handleTextEnlarge}>
      Enlarge Text
    </button>
  );
};

export default TextEnlarger;

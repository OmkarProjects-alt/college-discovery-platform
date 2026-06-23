"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Message = {
  id: number;
  message: string;
  timeStamp: string;
  success: boolean;
};

type ErrorAndSuccessMsgContextType = {
  messages: Message[];
  addMessage: (message: string, success?: boolean) => void;
  clearMessage: () => void;
};

const ErrorContext = createContext<ErrorAndSuccessMsgContextType | null>(null);

export function ErrorContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        setMessages((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const addMessage = (message: string, success = false) => {
    const messageObj: Message = {
      message,
      timeStamp: new Date().toISOString(),
      id: Date.now() + Math.floor(Math.random() * 1000),
      success,
    };
    setMessages((prev) => [...prev, messageObj]);
  };

  const clearMessage = () => {
    setMessages([]);
  };

  return (
    <ErrorContext.Provider
      value={{
        messages,
        addMessage,
        clearMessage,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
}

export default ErrorContextProvider;

export const useError = () => {
  const ctx = useContext(ErrorContext);
  if (!ctx) {
    throw new Error("useError must be used within ErrorContextProvider");
  }
  return ctx;
};
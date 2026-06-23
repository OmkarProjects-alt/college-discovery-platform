"use client";

import { createContext, useContext, useState } from "react";

type CompareContextType = {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeId: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
};

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const addToCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) return prev;

      return [...prev, id];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.filter((collegeId) => collegeId !== id)
    );
  };

  const removeId = (id: string) => {
    setCompareIds((prev) => 
        prev.filter((collegeId) => collegeId !== id)
    )
  }

  const clearCompare = () => {
    setCompareIds([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        removeId,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used within CompareProvider"
    );
  }

  return context;
}
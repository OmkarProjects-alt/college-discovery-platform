"use client";

import { useCompare } from "@/context/CompareContext";
import { useState } from "react";
import { useError } from "@/context/ErrorAndSuccessMsgContext";
import { GitCompare } from 'lucide-react'

export default function CompareButton({
  id,
}: {
  id: string;
}) {
  const { addMessage } = useError();

  const [IsSelect, setIsSelect] = useState(false);
  const { compareIds, addToCompare, removeId } = useCompare();

  const isAdded = compareIds.includes(id);

  const handleAddAndRemove = (id: string) => {
    if(!IsSelect) {
        addToCompare(id)
        addMessage("College added successfully, add one more college to compare", true)
        setIsSelect(true)
    } else {
        removeId(id)
        setIsSelect(false)
    }
  }

  return (
    <button
      onClick={() => handleAddAndRemove(id)}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium cursor-pointer"
    >
        <GitCompare className="w-4 h-4" />
      {isAdded ? "Added" : "Compare"}
    </button>
  );
}
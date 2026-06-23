"use client";

import { useEffect, useState } from "react";
import { getAllSavedCollegs } from "@/services/college.service";
import { useAuth } from "@/context/AuthContext";

export function useSavedColleges() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  // fetch saved colleges
  useEffect(() => {
    fetchSaved();
  }, []);

  async function fetchSaved() {

    if(!user) return;
    try {
      const res = await getAllSavedCollegs();

      if (res.success) {
        setSavedIds(
          res.saved.map(
            (item: any) => item.collegeId
          )
        );
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return {
    savedIds,
    setSavedIds,
    loading,
  };
}
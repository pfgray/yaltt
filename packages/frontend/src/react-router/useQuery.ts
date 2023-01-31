import React from "react";
import { useLocation } from "react-router-dom";

// the query string for you.
export function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

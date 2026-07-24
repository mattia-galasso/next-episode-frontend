import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  function showLoading() {
    setIsLoading(true);
  }

  function hideLoading() {
    setIsLoading(false);
  }

  const value = {
    isLoading,
    showLoading,
    hideLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

function useLoading() {
  return useContext(LoadingContext);
}

export { LoadingProvider, useLoading };

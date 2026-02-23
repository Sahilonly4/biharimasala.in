import React, { createContext, useContext } from "react";

const InternetIdentityContext = createContext(null);

export const InternetIdentityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <InternetIdentityContext.Provider value={null}>
      {children}
    </InternetIdentityContext.Provider>
  );
};

export const useInternetIdentity = () => {
  return useContext(InternetIdentityContext);
};

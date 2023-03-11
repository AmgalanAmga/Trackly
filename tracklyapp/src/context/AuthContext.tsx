import React, {useState, Dispatch, ReactNode} from 'react';
import {useContext, createContext, SetStateAction} from 'react';

type AuthContextValues = {
  userId: string;
  credential: CredentialType | null;
  setUserId: Dispatch<SetStateAction<string>>;
  setCredential: Dispatch<SetStateAction<CredentialType | any>>;
};

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [userId, setUserId] = useState<string>('');
  const [credential, setCredential] = useState<CredentialType | any>(null);

  return (
    <AuthContext.Provider
      value={{userId, credential, setUserId, setCredential}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

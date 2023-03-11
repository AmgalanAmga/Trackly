import React, {
  useState,
  Dispatch,
  ReactNode,
  useContext,
  createContext,
  SetStateAction,
} from 'react';
import {
  signOut,
  UserCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {update, ref} from 'firebase/database';
import {auth, database} from '../firebase';

type AuthContextValues = {
  logout: () => void;
  credential: CredentialType | null;
  setUserId: Dispatch<SetStateAction<string>>;
  setCredential: Dispatch<SetStateAction<any>>;
  signin: (email: string, password: string) => Promise<UserCredential>;
};

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [credential, setCredential] = useState<any>(null);
  const [userId, setUserId] = useState<string>('');
  const signin = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = async () => {
    await update(ref(database, 'drivers/' + userId), {loggedIn: false});
    await signOut(auth);
  };
  return (
    <AuthContext.Provider
      value={{signin, logout, credential, setUserId, setCredential}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

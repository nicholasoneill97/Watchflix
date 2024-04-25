
//import createContext
//import useContext
//import useEffect
//import useState for setting User
import { createContext, useContext, useEffect, useState } from 'react';

//import authorization and database
import { auth, db } from '../firebase';

//import createUserWithEmailAndPassword for users to be able to sign up with their email and password
//import signInWithEmailAndPassword for users to be able to sign in with their email and password
//signOut for users to be able to sign out
//import onAuthStateChanged for updates about when user has logged in, signed up, or logged out
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
//import setDoc and doc for user's data to get documented and saved
import {setDoc,doc} from 'firebase/firestore'

//initializes createContext

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

  //intitializes user set to empty container
  const [user, setUser] = useState({});

  //Takes in new user's passsword and email, sets a new doc
  //Initializes their "Saved Shows" to start as an empty contiainer

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
        savedShows: []
    })
  }

  //Function that checks their email and password and grants access depending on validity

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  //Function that handles logging out

  function logOut() {
    return signOut(auth);
  }

  //Function that handles unsubscribing

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
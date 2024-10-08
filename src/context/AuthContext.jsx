import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  getAuth,
} from "firebase/auth";
import { useUserContext } from "./UserContext";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserData } = useUserContext();

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth).then(() => {
      setUserData(null); // Clear user data from context
    });
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function handleUpdateEmail(email) {
    if (auth.currentUser) {
      return updateEmail(auth.currentUser, email);
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  function handleUpdatePassword(password) {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    } else {
      throw new Error("No user is currently logged in.");
    }
  }

  async function sendTokenToServer() {
    if (auth.currentUser) {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const idToken = await auth.currentUser.getIdToken(true);

        // Send token to backend for verification and fetching user data
        const response = await fetch(`${API_URL}/api/auth/verify-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to verify token with server");
        }
        const data = await response.json();
        setUserData(data.userData); // Pass the fetched user data to UserContext
        console.log("Token successfully verified with server");
        console.log(data.userData);
      } catch (error) {
        console.error("Error fetching ID token or sending to server:", error);
      }
    } else {
      console.error("No user is currently logged in");
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    handleUpdateEmail,
    handleUpdatePassword,
    sendTokenToServer,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

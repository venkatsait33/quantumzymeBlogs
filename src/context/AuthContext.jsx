// AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Import your Firebase auth object
import { onAuthStateChanged } from "firebase/auth";

// Create the Auth context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase listener for authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once the user is checked
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children} {/* Render children when not loading */}
    </AuthContext.Provider>
  );
};

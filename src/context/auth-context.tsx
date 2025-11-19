"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

// --- Mock Data ---
const ADMIN_EMAIL = "admin@example.com";
const NORMAL_USER_EMAIL = "user@example.com";

type MockUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
};

const createMockUser = (email: string, name: string): MockUser => ({
  uid: email,
  email,
  displayName: name,
  photoURL: `https://ui-avatars.com/api/?name=${name.replace(
    " ",
    "+"
  )}&background=random`,
});

const mockUsers = {
  [ADMIN_EMAIL]: {
    password: "adminpassword",
    user: createMockUser(ADMIN_EMAIL, "Admin Benutzer"),
  },
  [NORMAL_USER_EMAIL]: {
    password: "userpassword",
    user: createMockUser(NORMAL_USER_EMAIL, "Normaler Benutzer"),
  },
};
// --- End Mock Data ---

interface AuthContextType {
  user: MockUser | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  login: async () => false,
  googleLogin: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for a persisted user session
    try {
      const storedUser = localStorage.getItem("mockUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.email === ADMIN_EMAIL);
      }
    } catch (e) {
      console.error("Gespeicherter Benutzer konnte nicht analysiert werden", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, pass: string): Promise<boolean> => {
      setLoading(true);
      const userCredentials = mockUsers[email as keyof typeof mockUsers];
      if (userCredentials && userCredentials.password === pass) {
        const loggedInUser = userCredentials.user;
        setUser(loggedInUser);
        setIsAdmin(loggedInUser.email === ADMIN_EMAIL);
        localStorage.setItem("mockUser", JSON.stringify(loggedInUser));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    },
    []
  );

  const googleLogin = useCallback(async () => {
    setLoading(true);
    const loggedInUser = mockUsers[NORMAL_USER_EMAIL].user;
    setUser(loggedInUser);
    setIsAdmin(false);
    localStorage.setItem("mockUser", JSON.stringify(loggedInUser));
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("mockUser");
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, login, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

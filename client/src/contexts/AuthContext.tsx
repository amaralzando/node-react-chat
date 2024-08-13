"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

type User = {
  user_Id: string;
  name: string;
  email: string;
  role?: string;
  token?: string;
};

type SignInData = {
  email: string;
  password: string;
};

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  token?: string;
  user?: User;
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  logOut: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({
    user_Id: "",
    name: "",
    email: "",
    token: "",
  });
  const [token, setToken] = useState<string>();
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "gasachat.token": token } = parseCookies();
    if (token) {
      const { "gasachat.user_Id": user_Id } = parseCookies();
      api.post("/user/me", { user_Id }).then((resp) => {
        setUser({
          user_Id: resp.data._id,
          name: resp.data.name,
          email: resp.data.email,
        });
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    await api
      .post("/user/auth", { email, password })
      .then((resp) => {
        const user = resp.data;
        console.log(user);

        setCookie(undefined, "gasachat.token", user.token, {
          maxAge: 60 * 60 * 24, // 1 day
        });
        setCookie(undefined, "gasachat.user_Id", user.user_Id, {
          maxAge: 60 * 60 * 24, // 1 day
        });

        api.defaults.headers["Authorization"] = `Bearer ${user.token}`;

        setUser(user);
        setToken(user.token);

        router.push("/chat");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.error);
        }
      });
  }

  async function signUp({ name, email, password }: SignUpData) {
    await api
      .post("/user/register", { name, email, password })
      .then((resp) => {
        const user = resp.data;

        setCookie(undefined, "gasachat.token", user.token, {
          maxAge: 60 * 60 * 24, // 1 day
        });
        setCookie(undefined, "gasachat.user_Id", user.user_Id, {
          maxAge: 60 * 60 * 24, // 1 day
        });

        api.defaults.headers["Authorization"] = `Bearer ${user.token}`;

        setUser(user);
        setToken(user.token);

        router.push("/chat");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          throw new Error(error.response?.data?.error);
        }
      });
  }

  async function logOut() {
    destroyCookie(undefined, "gasachat.token");
    destroyCookie(undefined, "gasachat.user_Id");

    console.log("Logged out. Redirecting");
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, signIn, signUp, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);

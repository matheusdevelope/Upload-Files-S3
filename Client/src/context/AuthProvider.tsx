import { createContext, ReactNode, useState } from "react";
import { HolesUserLogin } from "../types/UserLogin";
interface IUserLogin {
  user: string;
  pass: string;
  access: HolesUserLogin;
  logged: boolean;
}
interface IContext {
  user: IUserLogin | undefined;
  setUser: (user: IUserLogin) => void;
}
interface Props {
  children: ReactNode;
}

export const UserLogin = createContext<IContext | undefined>(undefined);

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IUserLogin | undefined>(undefined);

  const value: IContext = {
    user,
    setUser,
  };

  return <UserLogin.Provider value={value}>{children}</UserLogin.Provider>;
}
export default AuthProvider;

import { createContext, ReactNode, useState } from "react";
import { IManager } from "../types/Manager";
interface IHolesManager {
  firstAccess: 0;
  readOnly: 1;
  all: 2;
}

interface IContext {
  user: IManager | undefined;
  setUser: (user: IManager | undefined) => void;
  HolesManager: IHolesManager;
}
interface Props {
  children: ReactNode;
}

export const UserLogin = createContext<IContext | undefined>(undefined);

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<IManager | undefined>(undefined);
  const HolesManager: IHolesManager = {
    firstAccess: 0,
    readOnly: 1,
    all: 2,
  };
  const value: IContext = {
    user,
    setUser,
    HolesManager,
  };

  return <UserLogin.Provider value={value}>{children}</UserLogin.Provider>;
}
export default AuthProvider;

import { createContext, ReactNode, useContext, useState } from "react";
import useUser from "../hooks/useUser";
import { IUser } from "../types/User";
import { UserLogin } from "./AuthProvider";

interface IContext {
  Users: IUser[];
  AddUser: (users: IUser) => void;
  EditUser: (users: IUser) => void;
  DeleteUser: (users: IUser) => void;
}
interface Props {
  children: ReactNode;
}

export const Users = createContext<IContext | undefined>(undefined);

function AuthProvider({ children }: Props) {
  const Token = useContext(UserLogin)?.user?.token || "";
  const User = useUser();
  const [usersList, setUserList] = useState<IUser[]>([]);

  function AddUser(user: IUser) {
    User.AddUser(user, Token).then((ret) => {
      if (ret) return setUserList((state) => [...state, ret]);
    });
  }

  function EditUser(user: IUser) {
    function EditOnList(user: IUser) {
      const i = usersList.findIndex((obj, i) => obj.id === user.id);
      let copyList = usersList;
      copyList.splice(i, 1, user);
      setUserList([...copyList]);
    }
    User.EditUser(user, Token).then((ret) => {
      if (ret) return EditOnList(user);
    });
  }

  function DeleteUser(user: IUser) {
    User.DeleteUser(user, Token).then((ret) => {
      if (ret) setUserList(usersList.filter((obj) => obj.id !== user.id));
    });
  }

  const value: IContext = {
    Users: usersList,
    AddUser,
    EditUser,
    DeleteUser,
  };

  return <Users.Provider value={value}>{children}</Users.Provider>;
}
export default AuthProvider;

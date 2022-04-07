import { useContext, useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import ListUser from "../../components/ListUsers";
import { IUser } from "../../types/User";
import * as C from "./style";
import HeaderApp from "../../components/HeaderApp";
import useUser from "../../hooks/useUser";
import { UserLogin } from "../../context/AuthProvider";
function Manager() {
  const User = useUser();
  const Token = useContext(UserLogin)?.user?.token || "";
  const [usersList, setUserList] = useState<IUser[]>([]);
  const [userToEdit, setUserToEdit] = useState<IUser>();
  async function handleAddUser(user: IUser) {
    const ret = await User.AddUser(user, Token);
    if (ret) {
      setUserList((state) => [...state, ret]);
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  async function handleEditUser(user: IUser) {
    function EditOnList(user: IUser) {
      const i = usersList.findIndex((obj, i) => obj.id === user.id);
      let copyList = usersList;
      copyList.splice(i, 1, user);
      setUserList([...copyList]);
    }
    const ret = await User.EditUser(user, Token);

    if (ret) {
      EditOnList(user);
      setUserToEdit(undefined);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  function handleDeleteUser(user: IUser) {
    User.DeleteUser(user, Token).then((ret) => {
      if (ret) setUserList(usersList.filter((obj) => obj.id !== user.id));
    });
  }

  function handleSendEditUserToForm(user: IUser) {
    setUserToEdit({ ...user });
  }

  useEffect(() => {
    User.GetUser(undefined, Token).then((res) => res && setUserList([...res]));
  }, []);

  return (
    <C.Container>
      <HeaderApp origin="Manager" />
      <C.AreaUsers>
        <div>
          <FormUser
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            UserToEdit={userToEdit}
          />
        </div>
      </C.AreaUsers>
    </C.Container>
  );
}

export default Manager;

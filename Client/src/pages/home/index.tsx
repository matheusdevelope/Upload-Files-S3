import { useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import ListUser from "../../components/ListUsers";
import { IUser } from "../../types/User";
import * as C from "./style";
import HeaderApp from "../../components/HeaderApp";
import useUser from "../../hooks/useUser";
function Home() {
  const [usersList, setUserList] = useState<IUser[]>([]);
  const [userToEdit, setUserToEdit] = useState<IUser>();
  const User = useUser();

  function handleAddUser(user: IUser) {
    ///debug
    setUserList((state) => [...state, user]);
    return;
    ///debug
    User.AddUser(user).then((ret) => {
      if (ret) return setUserList((state) => [...state, user]);
      alert("Não foi possivel adicionar o usuário!");
    });
  }

  function handleEditUser(user: IUser) {
    function EditOnList(user: IUser) {
      const i = usersList.findIndex((obj, i) => obj.id === user.id);
      let copyList = usersList;
      copyList.splice(i, 1, user);
      setUserList([...copyList]);
    }
    ///debug
    return EditOnList(user);
    ///debug
    User.EditUser(user).then((ret) => {
      if (ret) return EditOnList(user);
      alert("Falha ao editar o registro");
    });
    setUserToEdit(undefined);
  }

  function handleDeleteUser(user: IUser) {
    User.DeleteUser(user).then((ret) => {
      if (ret) setUserList(usersList.filter((obj) => obj.id !== user.id));
    });
  }

  function handleSendEditUserToForm(user: IUser) {
    setUserToEdit({ ...user });
  }
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  return (
    <C.Container>
      <HeaderApp />
      <C.AreaUsers>
        <FormUser
          handleAddUser={handleAddUser}
          handleEditUser={handleEditUser}
          UserToEdit={userToEdit}
        />
        <ListUser
          Users={usersList}
          handleSendEditUserToForm={handleSendEditUserToForm}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
        />
      </C.AreaUsers>
    </C.Container>
  );
}

export default Home;

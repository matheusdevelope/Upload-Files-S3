import { useContext, useEffect, useState } from "react";
import FormUser from "../../components/FormUser";
import ListUser from "../../components/ListUsers";
import { IUser } from "../../types/User";
import * as C from "./style";
import HeaderApp from "../../components/HeaderApp";
import useUser from "../../hooks/useUser";
import { UserLogin } from "../../context/AuthProvider";
import AreaFTP from "../../components/AreaFTP";
import { IFTP } from "../../types/FTP";
function Home() {
  const User = useUser();
  const Token = useContext(UserLogin)?.user?.token || "";
  const [usersList, setUserList] = useState<IUser[]>([]);
  const [userToEdit, setUserToEdit] = useState<IUser>();
  const [FTPList, setFTPList] = useState<IFTP[]>([]);
  console.log(FTPList);
  function handleAddUser(user: IUser) {
    user.ftp = [...FTPList];
    User.AddUser(user, Token).then((ret) => {
      if (ret) {
        setFTPList([]);
        setUserList((state) => [...state, ret]);
        return;
      }
    });
  }

  function handleEditUser(user: IUser) {
    function EditOnList(user: IUser) {
      const i = usersList.findIndex((obj, i) => obj.id === user.id);
      let copyList = usersList;
      copyList.splice(i, 1, user);
      setFTPList([]);
      setUserList([...copyList]);
    }
    if (userToEdit) user.ftp = [...FTPList];
    User.EditUser(user, Token).then((ret) => {
      if (ret) return EditOnList(user);
    });
    setUserToEdit(undefined);
  }

  function handleDeleteUser(user: IUser) {
    User.DeleteUser(user, Token).then((ret) => {
      if (ret) setUserList(usersList.filter((obj) => obj.id !== user.id));
    });
  }

  function handleSendEditUserToForm(user: IUser) {
    setUserToEdit({ ...user });
    setFTPList([...user.ftp]);
  }

  useEffect(() => {
    User.GetUser(undefined, Token).then((res) => res && setUserList([...res]));
  }, []);

  return (
    <C.Container>
      <HeaderApp />
      <C.AreaUsers>
        <div>
          <FormUser
            handleAddUser={handleAddUser}
            handleEditUser={handleEditUser}
            UserToEdit={userToEdit}
          />
          <AreaFTP FTPList={FTPList} setFTPList={setFTPList} />
        </div>

        <ListUser
          Users={usersList}
          handleSendEditUserToForm={handleSendEditUserToForm}
          handleEditUser={handleEditUser}
          handleDeleteUser={handleDeleteUser}
          DisableButtons={userToEdit}
        />
      </C.AreaUsers>
    </C.Container>
  );
}

export default Home;

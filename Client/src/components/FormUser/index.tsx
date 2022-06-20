import * as R from "react";
import { IUser } from "../../types/User";
import { IFTP } from "../../types/FTP";
import AreaFTP from "../AreaFTP";
import * as C from "./style";

interface Props {
  handleAddUser: (user: IUser) => Promise<boolean>;
  handleEditUser: (user: IUser) => Promise<boolean>;
  UserToEdit: IUser | undefined;
}

function FormUser({ handleAddUser, handleEditUser, UserToEdit }: Props) {
  const InitialUser: IUser = {
    id: "",
    name: "",
    cnpj: "",
    allow_access: true,
    expiration_files: 30,
    ftp: [],
  };
  const [user, setUser] = R.useState<IUser>(InitialUser);
  const [reset, setReset] = R.useState(false);

  function OnChange(e: R.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "name":
        setUser({ ...user, name: e.target.value });
        return;
      case "cnpj":
        setUser({ ...user, cnpj: e.target.value });
        return;
      case "expiration_files":
        setUser({ ...user, expiration_files: Number(e.target.value) });
        return;
      case "allow_access":
        setUser({ ...user, allow_access: Boolean(e.target.checked) });
        return;
      default:
        return alert("Field não mapeado");
    }
  }
  async function handleOnClick() {
    if (user.name === "" || user.cnpj === "")
      return alert("Preencha os dados de Nome e CNPJ!");
    if (user.expiration_files < 5)
      return alert("O tempo minimo de expiração de arquivos é 5 dias!");
    if (UserToEdit) {
      const ret = await handleEditUser(user);
      if (!ret) return;
    } else {
      const ret = await handleAddUser({ ...user });
      if (!ret) return;
    }
    setUser({ ...InitialUser });
    setReset(!reset);
  }
  function setFTPList(ftpList: IFTP[]) {
    let copy = user;
    copy.ftp = [...ftpList];
    setUser({ ...copy });
  }

  R.useEffect(() => {
    if (UserToEdit) setUser({ ...UserToEdit });
  }, [UserToEdit]);
  return (
    <C.Container>
      <C.Header>Adicionar Novo Usuário</C.Header>
      <C.Form>
        <label>
          Nome Empresa:
          <input name="name" value={user.name} onChange={OnChange} />
        </label>
        <label>
          CNPJ/CPF:
          <input name="cnpj" value={user.cnpj} onChange={OnChange} />
        </label>
        <label className="label_expiration_files">
          Tempo De Expiração Arquivos:
          <input
            className="expiration_files"
            type="number"
            name="expiration_files"
            value={user.expiration_files}
            onChange={OnChange}
          />
        </label>
        <label className="allow_access">
          <input
            name="allow_access"
            type="checkbox"
            checked={user.allow_access}
            onChange={OnChange}
          />
          Acessar Recursos API:
        </label>
      </C.Form>
      <AreaFTP FTPList={user.ftp} setFTPList={setFTPList} reset={reset} />
      <C.Button onClick={handleOnClick}>
        {UserToEdit ? "Salvar Alterações Usuário" : "Adicionar Usuário"}
      </C.Button>
    </C.Container>
  );
}

export default FormUser;

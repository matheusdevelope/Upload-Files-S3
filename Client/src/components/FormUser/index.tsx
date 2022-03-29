import * as R from "react";
import { IUser } from "../../types/User";
import * as C from "./style";

interface Props {
  handleAddUser: (user: IUser) => void;
  handleEditUser: (user: IUser) => void;
  UserToEdit: IUser | undefined;
}
function HashUnique(size: number) {
  let dt = new Date().getTime();
  let base_size = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
  let new_size = base_size.substring(0, Number(size) < 5 ? 5 : Number(size));
  let uuid = new_size.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}
function FormUser({ handleAddUser, handleEditUser, UserToEdit }: Props) {
  const InitialUser: IUser = {
    id: "",
    name: "",
    cnpj: "",
    allow_access: true,
    expiration_files: 30,
  };
  const [user, setUser] = R.useState<IUser>(InitialUser);

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
  function handleOnClick() {
    if (user.name === "" || user.cnpj === "")
      return alert("Preencha os dados de Nome e CNPJ!");
    if (user.expiration_files < 5)
      return alert("O tempo minimo de expiração de arquivos é 5 dias!");
    if (UserToEdit) {
      handleEditUser(user);
    } else {
      handleAddUser({ ...user, id: HashUnique(10) });
    }
    setUser(InitialUser);
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
        <label>
          Tempo De Expiração Arquivos:
          <input
            name="expiration_files"
            value={user.expiration_files}
            onChange={OnChange}
          />
        </label>
        <label>
          Pode Acessar Recursos API:
          <input
            name="allow_access"
            type="checkbox"
            checked={user.allow_access}
            onChange={OnChange}
          />
        </label>
      </C.Form>
      <C.Button onClick={handleOnClick}>
        {UserToEdit ? "Salvar Alterações" : "Adicionar"}
      </C.Button>
    </C.Container>
  );
}
export default FormUser;

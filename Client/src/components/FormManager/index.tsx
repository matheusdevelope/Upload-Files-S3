import * as R from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthProvider";
import * as C from "./style";
import useManager from "../../hooks/useManager";
import { IManager } from "../../types/Manager";

interface Props {
  handleAddManager: (manager: IManager) => Promise<boolean>;
  handleEditManager: (manager: IManager) => Promise<boolean>;
  managerToEdit?: IManager;
}
function FormManager({
  handleAddManager,
  handleEditManager,
  managerToEdit,
}: Props) {
  const State = R.useContext(UserLogin);
  const initialManager: IManager = {
    id: undefined,
    user: "",
    name: "",
    access: State?.HolesManager.readOnly || 0,
    pass: "",
  };
  const [user, setUser] = R.useState<IManager>(initialManager);
  // const [userInput, setUserInput] = R.useState("");
  // const [nameInput, setNameInput] = R.useState("");
  // const [access, setAccess] = R.useState(1);
  // const [passInput, setPassInput] = R.useState("");
  const [confirmpassInput, setConfirmPassInput] = R.useState("");

  function OnChange(e: R.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "user":
        setUser({ ...user, user: e.target.value });
        return;
      case "name":
        setUser({ ...user, name: e.target.value });
        return;
      case "pass":
        setUser({ ...user, pass: e.target.value });
        return;
      default:
        return alert("Field não mapeado");
    }
  }
  function OnSelect(e: R.ChangeEvent<HTMLSelectElement>) {
    setUser({ ...user, access: Number(e.target.value) });
  }

  async function handleOnClick() {
    if (user.user === "" || user.name === "")
      return alert("Preencha os dados de Nome e Usuário!");
    if (managerToEdit) {
      const ret = await handleEditManager(user);
      if (!ret) return;
    } else {
      const ret = await handleAddManager({ ...user });
      if (!ret) return;
    }
    setUser({ ...initialManager });
    setConfirmPassInput("");
    // setReset(!reset);
  }
  R.useEffect(() => {
    if (managerToEdit) setUser({ ...managerToEdit });
  }, [managerToEdit]);

  return (
    <C.Container>
      <C.Header>Adicionar Administrador</C.Header>
      <form>
        <label htmlFor="user">
          Usuário:
          <input
            autoCorrect="none"
            autoFocus
            name="user"
            value={user.user}
            onChange={OnChange}
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            autoCorrect="none"
            autoFocus
            name="name"
            value={user.name}
            onChange={OnChange}
          />
        </label>
        <label htmlFor="access">
          Acesso:
          <select name="access" value={user.access} onChange={OnSelect}>
            <option value={State?.HolesManager.readOnly}>
              Apenas Consulta
            </option>
            <option value={State?.HolesManager.firstAccess}>
              Administrador (Exige redefinição de senha)
            </option>
            <option value={State?.HolesManager.all}>Administrador</option>
          </select>
        </label>
        <label htmlFor="pass">
          Senha:
          <input
            type="password"
            name="pass"
            value={user.pass}
            onChange={OnChange}
          />
        </label>
        <label htmlFor="pass">
          Confirme a Senha:
          <input
            type="password"
            name="pass"
            value={confirmpassInput}
            onChange={(e) => {
              setConfirmPassInput(e.target.value);
            }}
          />
        </label>
      </form>
      <C.Button
        onClick={handleOnClick}
        disabled={
          confirmpassInput !== user.pass ||
          user.pass === "" ||
          confirmpassInput === ""
        }
      >
        {managerToEdit ? "Salvar Alterações Usuário" : "Adicionar Usuário"}
      </C.Button>
    </C.Container>
  );
}
export default FormManager;

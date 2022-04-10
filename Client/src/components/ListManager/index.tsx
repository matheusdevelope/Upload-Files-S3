import * as R from "react";
import { UserLogin } from "../../context/AuthProvider";
import { IManager } from "../../types/Manager";
import * as C from "./style";
interface Props {
  Managers: IManager[];
  handleSendEditManagerToForm: (manager: IManager) => void;
  handleDeleteManager: (manager: IManager) => void;
  handleEditManager: (manager: IManager) => void;
  DisableButtons: IManager | undefined;
}
function ListManager({
  Managers,
  handleSendEditManagerToForm,
  handleDeleteManager,
  handleEditManager,
  DisableButtons,
}: Props) {
  const State = R.useContext(UserLogin);
  function onChange(e: R.ChangeEvent<HTMLSelectElement>, manager: IManager) {
    handleEditManager({ ...manager, access: Number(e.target.value) });
  }
  function RenderLine(manager: IManager, key: number) {
    return (
      <C.LineUser key={key}>
        <p>{manager.user}</p>
        <p>{manager.name}</p>
        <div className="SelectArea">
          <select
            name="access"
            defaultValue={manager.access}
            onChange={(e) => {
              onChange(e, manager);
            }}
          >
            <option value={State?.HolesManager.readOnly}>
              Apenas Consulta
            </option>
            <option value={State?.HolesManager.firstAccess}>
              Administrador (Exige redefinição de senha)
            </option>
            <option value={State?.HolesManager.all}>Administrador</option>
          </select>
        </div>

        <div>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleSendEditManagerToForm(manager);
            }}
          >
            Editar
          </button>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleDeleteManager(manager);
            }}
          >
            Excluir
          </button>
        </div>
      </C.LineUser>
    );
  }
  return (
    <C.Container>
      <C.Header>Usuários Registrados</C.Header>
      <C.Tittles>
        <p>User</p>
        <p>Nome</p>
        <p>Acesso</p>
        <p>Ação</p>
      </C.Tittles>
      <ul>{Managers.map(RenderLine)}</ul>
    </C.Container>
  );
}
export default ListManager;

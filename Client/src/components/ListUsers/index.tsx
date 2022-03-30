import * as R from "react";
import { IUser } from "../../types/User";
import * as C from "./style";
interface Props {
  Users: IUser[];
  handleSendEditUserToForm: (user: IUser) => void;
  handleDeleteUser: (user: IUser) => void;
  handleEditUser: (user: IUser) => void;
  DisableButtons: IUser | undefined;
}
function ListUsers({
  Users,
  handleSendEditUserToForm,
  handleDeleteUser,
  handleEditUser,
  DisableButtons,
}: Props) {
  function onChange(e: R.ChangeEvent<HTMLInputElement>, user: IUser) {
    handleEditUser({ ...user, allow_access: e.target.checked });
  }
  function RenderLine(user: IUser, key: number) {
    return (
      <C.LineUser key={key}>
        <p>{user.name}</p>
        <p>{user.cnpj}</p>
        <p>{user.expiration_files}</p>
        <input
          type="checkbox"
          checked={user.allow_access}
          onChange={(e) => onChange(e, user)}
        />
        <div>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleSendEditUserToForm(user);
            }}
          >
            Editar
          </button>
          <button
            disabled={Boolean(DisableButtons)}
            onClick={() => {
              handleDeleteUser(user);
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
        <p>Nome</p>
        <p>CNPJ</p>
        <p>Expiração Arquivos</p>
        <p>Acessa API</p>
        <p>Ação</p>
      </C.Tittles>
      <ul>{Users.map(RenderLine)}</ul>
    </C.Container>
  );
}
export default ListUsers;

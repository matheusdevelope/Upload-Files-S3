import * as R from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthProvider";
import * as C from "./style";
import useManager from "../../hooks/useManager";
import { IManager } from "../../types/Manager";

function FormChangeManagerCredentials() {
  const State = R.useContext(UserLogin);
  const [userInput, setUserInput] = R.useState<string>(State?.user?.user || "");
  const [passInput, setPassInput] = R.useState<string>("");
  const [confirmpassInput, setConfirmPassInput] = R.useState<string>("");
  const [loading, setLoading] = R.useState<boolean>(false);
  const Manager = useManager();
  const navigate = useNavigate();

  return (
    <C.Container>
      <h4>
        Você precisa alterar as credenciais de administrador para prosseguir.
      </h4>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const newManager: IManager = {
            id: State?.user?.id,
            user: userInput,
            pass: passInput,
            access: State?.HolesManager.all || 0,
          };
          if (userInput === "" || passInput === "")
            return alert("Preencha os Dados!");
          setLoading(true);
          try {
            const retManager = await Manager.EditManager(
              newManager,
              State?.user?.token || ""
            );
            if (retManager) {
              State?.setUser(retManager);
              navigate("/login");
            } else {
              alert("Falha ao redefinir credenciais. Detalhes no console.");
            }

            return;
          } catch (e: any) {
            setLoading(false);
            alert("Falha no login: " + JSON.stringify(e.data.message));
            return;
          }
        }}
      >
        <label htmlFor="user">
          Usuário:
          <input
            autoCorrect="none"
            autoFocus
            type="text"
            name="user"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        </label>
        <label htmlFor="pass">
          Senha:
          <input
            type="password"
            name="pass"
            value={passInput}
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
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
        <button
          disabled={
            confirmpassInput !== passInput ||
            passInput === "" ||
            confirmpassInput === ""
          }
          type="submit"
        >
          Entrar
        </button>
      </form>
      {loading && "Validando..."}
    </C.Container>
  );
}
export default FormChangeManagerCredentials;

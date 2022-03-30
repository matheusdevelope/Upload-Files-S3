import * as R from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../services/Login";
import { UserLogin } from "../../context/AuthProvider";
import * as C from "./style";
function Login() {
  const [userInput, setUserInput] = R.useState<string>("");
  const [passInput, setPassInput] = R.useState<string>("");
  const [loading, setLoading] = R.useState<boolean>(false);
  const State = R.useContext(UserLogin);
  const navigate = useNavigate();
  return (
    <C.Container>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const user = {
            user: userInput,
            pass: passInput,
          };
          if (userInput === "" || passInput === "")
            return alert("Preencha os Dados!");
          setLoading(true);
          try {
            const retUser = await useLogin(user);
            State?.setUser(retUser);
            console.log("aqui");
            navigate("/home");
            return;
          } catch (e: any) {
            setLoading(false);
            alert("Falha no login: " + JSON.stringify(e.data.message));
            return;
          }

          setLoading(false);
        }}
      >
        <label htmlFor="user">
          Usuário
          <input
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
          Senha
          <input
            type="password"
            name="pass"
            value={passInput}
            onChange={(e) => {
              setPassInput(e.target.value);
            }}
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
      {loading && "Validando..."}
    </C.Container>
  );
}
export default Login;

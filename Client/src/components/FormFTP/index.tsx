import * as R from "react";
import { IFTP } from "../../types/FTP";
import * as C from "./style";
interface Props {
  handleAddFTP: (FTP: IFTP) => void;
  handleEditFTP: (FTP: IFTP, key?: number) => void;
  FTPToEdit: IFTP | undefined;
}

function FormFTP({ handleAddFTP, handleEditFTP, FTPToEdit }: Props) {
  const InitialFTP: IFTP = {
    host: "",
    user: "",
    pass: "",
    port: 21,
    path: "",
    deleteFiles: true,
    order: 1,
  };
  const [FTP, setFTP] = R.useState<IFTP>(InitialFTP);

  function OnChange(e: R.ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "host":
        setFTP({ ...FTP, host: e.target.value });
        return;
      case "user":
        setFTP({ ...FTP, user: e.target.value });
        return;
      case "pass":
        setFTP({ ...FTP, pass: e.target.value });
        return;
      case "port":
        setFTP({ ...FTP, port: Number(e.target.value) });
        return;
      case "path":
        setFTP({ ...FTP, path: e.target.value });
        return;
      case "deleteFiles":
        setFTP({ ...FTP, deleteFiles: Boolean(e.target.checked) });
        return;
      case "order":
        setFTP({ ...FTP, order: Number(e.target.value) });
        return;
      default:
        return alert("Field não mapeado");
    }
  }
  function handleOnClick() {
    if (
      FTP.host === "" ||
      FTP.user === "" ||
      FTP.pass === "" ||
      FTP.path === ""
    )
      return alert("Preencha os dados de Conexão com FTP!");

    if (FTPToEdit) {
      handleEditFTP(FTP);
    } else {
      handleAddFTP(FTP);
    }

    setFTP(InitialFTP);
  }

  R.useEffect(() => {
    if (FTPToEdit) setFTP({ ...FTPToEdit });
  }, [FTPToEdit]);
  return (
    <C.Container>
      <C.Form>
        <div>
          <input
            name="host"
            value={FTP.host}
            onChange={OnChange}
            placeholder="Host"
          />
          <label htmlFor="port" className="port">
            Porta:
            <input
              name="port"
              type="number"
              value={FTP.port}
              onChange={OnChange}
              placeholder="Porta"
            />
          </label>
        </div>
        <div>
          <input
            name="user"
            value={FTP.user}
            onChange={OnChange}
            placeholder="Usuário"
          />
          <input
            name="pass"
            value={FTP.pass}
            onChange={OnChange}
            placeholder="Senha"
          />
        </div>

        <label>
          Pasta Padrão:
          <input name="path" value={FTP.path} onChange={OnChange} />
        </label>

        <div className="Div2">
          <label className="labelDeleteFiles">
            <input
              name="deleteFiles"
              type="checkbox"
              checked={FTP.deleteFiles}
              onChange={OnChange}
            />
            Deletar Arquivos após uso:
          </label>
          <label>
            Ordem Disponibilidade:
            <input
              name="order"
              type="number"
              value={FTP.order}
              onChange={OnChange}
            />
          </label>
        </div>
      </C.Form>
      <C.Button onClick={handleOnClick}>
        {FTPToEdit ? "Salvar Alterações" : "Adicionar"}
      </C.Button>
    </C.Container>
  );
}
export default FormFTP;

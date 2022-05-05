import { useContext, useEffect, useState, ChangeEvent } from "react";
import * as C from "./style";
import HeaderApp from "../../components/HeaderApp";
import { UserLogin } from "../../context/AuthProvider";
import FormManager from "../../components/FormManager";
import ListManager from "../../components/ListManager";
import useManager from "../../hooks/useManager";
import { IManager } from "../../types/Manager";
import { IFTP } from "../../types/FTP";
import useFTP from "../../hooks/useFTP";

function AreaManager() {
  const Manager = useManager();
  const FTP = useFTP();
  const Token = useContext(UserLogin)?.user?.token || "";
  const [managerList, setManagerList] = useState<IManager[]>([]);
  const [managerToEdit, setManagerToEdit] = useState<IManager>();
  const InitialFTP: IFTP = {
    host: "",
    user: "",
    pass: "",
    port: 21,
    path: "",
    deleteFiles: true,
    order: 1,
  };
  const [ftp, setFTP] = useState<IFTP>(InitialFTP);

  async function handleAddManager(manager: IManager) {
    const ret = await Manager.AddManager(manager, Token);
    if (ret) {
      setManagerList((state) => [...state, ret]);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async function handleEditManager(manager: IManager) {
    function EditOnList(manager: IManager) {
      const i = managerList.findIndex((obj, i) => obj.id === manager.id);
      let copyList = managerList;
      copyList.splice(i, 1, manager);
      setManagerList([...copyList]);
    }
    const ret = await Manager.EditManager(manager, Token);

    if (ret) {
      EditOnList(manager);
      setManagerToEdit(undefined);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  function handleDeleteManager(manager: IManager) {
    Manager.DeleteManager(manager, Token).then((ret) => {
      if (ret)
        setManagerList(managerList.filter((obj) => obj.id !== manager.id));
    });
  }

  function handleSendEditManagerToForm(manager: IManager) {
    setManagerToEdit({ ...manager });
  }
  async function handleAddFTPDefault() {
    if (ftp.id) {
      const retFTP = await FTP.EditFTP(ftp, Token);
      if (!retFTP) {
        alert("Falha ao editar FTP Padrão");
      }
      return;
    }
    const retFTP = await FTP.AddFTP(ftp, Token);
    if (!retFTP) {
      alert("Falha ao adicionar FTP Padrão, tente novamente.");
    }
    return;
  }

  function OnChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case "host":
        setFTP({ ...ftp, host: e.target.value });
        return;
      case "user":
        setFTP({ ...ftp, user: e.target.value });
        return;
      case "pass":
        setFTP({ ...ftp, pass: e.target.value });
        return;
      case "port":
        setFTP({ ...ftp, port: Number(e.target.value) });
        return;
      case "path":
        setFTP({ ...ftp, path: e.target.value });
        return;
      case "deleteFiles":
        setFTP({ ...ftp, deleteFiles: Boolean(e.target.checked) });
        return;
      case "order":
        setFTP({ ...ftp, order: Number(e.target.value) });
        return;
      default:
        return alert("Field não mapeado");
    }
  }
  // function FormFTPDefault() {
  //   return (
  //     <C.FormFTPDefault>
  //       <div className="HeaderFormFTPDefault">
  //         <h4>FTP Padrão</h4>
  //         <button onClick={handleAddFTPDefault}>{"Atualizar"}</button>
  //       </div>
  //       <>
  //         <input
  //           value={ftp?.host}
  //           onChange={OnChange}
  //           name="host"
  //           type="text"
  //           className="host"
  //           placeholder="Host FTP"
  //         />
  //         <input
  //           value={ftp?.user}
  //           onChange={OnChange}
  //           name="user"
  //           type="text"
  //           className="user"
  //           placeholder="Usuário"
  //         />
  //         <input
  //           value={ftp?.pass}
  //           onChange={OnChange}
  //           name="pass"
  //           type="password"
  //           className="pass"
  //           placeholder="Senha FTP"
  //         />
  //         <input
  //           value={ftp?.path}
  //           onChange={OnChange}
  //           name="path"
  //           type="text"
  //           className="path"
  //           placeholder="Caminho dos Arquivos"
  //         />
  //         <input
  //           value={ftp?.port}
  //           onChange={OnChange}
  //           name="port"
  //           type="number"
  //           className="port"
  //           placeholder="Porta"
  //         />

  //         <label htmlFor="deleteFiles">
  //           <input
  //             checked={ftp?.deleteFiles}
  //             onChange={OnChange}
  //             name="deleteFiles"
  //             type="checkbox"
  //             className="deleteFiles"
  //           />
  //           Deletar Arquivos
  //         </label>
  //       </>
  //     </C.FormFTPDefault>
  //   );
  // }

  useEffect(() => {
    Manager.GetManager(undefined, Token).then(
      (res) => res && setManagerList([...res])
    );
    FTP.GetFTP(undefined, Token).then((res) => res && setFTP({ ...res[0] }));
  }, []);

  return (
    <C.Container>
      <HeaderApp origin="Manager" title="AREA DO ADMINISTRADOR" />
      <C.FormFTPDefault>
        <div className="HeaderFormFTPDefault">
          <h4>FTP Padrão</h4>
          <button onClick={handleAddFTPDefault}>{"Atualizar"}</button>
        </div>
        <>
          <input
            value={ftp?.host}
            onChange={OnChange}
            name="host"
            type="text"
            className="host"
            placeholder="Host FTP"
          />
          <input
            value={ftp?.user}
            onChange={OnChange}
            name="user"
            type="text"
            className="user"
            placeholder="Usuário"
          />
          <input
            value={ftp?.pass}
            onChange={OnChange}
            name="pass"
            type="password"
            className="pass"
            placeholder="Senha FTP"
          />
          <input
            value={ftp?.path}
            onChange={OnChange}
            name="path"
            type="text"
            className="path"
            placeholder="Caminho dos Arquivos"
          />
          <input
            value={ftp?.port}
            onChange={OnChange}
            name="port"
            type="number"
            className="port"
            placeholder="Porta"
          />

          <label htmlFor="deleteFiles">
            <input
              checked={ftp?.deleteFiles}
              onChange={OnChange}
              name="deleteFiles"
              type="checkbox"
              className="deleteFiles"
            />
            Deletar Arquivos
          </label>
        </>
      </C.FormFTPDefault>
      <h4>Administradores:</h4>
      <C.AreaManagers>
        <div>
          <FormManager
            handleAddManager={handleAddManager}
            handleEditManager={handleEditManager}
            managerToEdit={managerToEdit}
          />
        </div>
        <ListManager
          Managers={managerList}
          handleSendEditManagerToForm={handleSendEditManagerToForm}
          handleEditManager={handleEditManager}
          handleDeleteManager={handleDeleteManager}
          DisableButtons={managerToEdit}
        />
      </C.AreaManagers>
    </C.Container>
  );
}

export default AreaManager;

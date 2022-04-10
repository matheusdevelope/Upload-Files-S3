import { useContext, useEffect, useState } from "react";
import * as C from "./style";
import HeaderApp from "../../components/HeaderApp";
import { UserLogin } from "../../context/AuthProvider";
import FormManager from "../../components/FormManager";
import ListManager from "../../components/ListManager";
import useManager from "../../hooks/useManager";
import { IManager } from "../../types/Manager";
function AreaManager() {
  const Manager = useManager();
  const Token = useContext(UserLogin)?.user?.token || "";
  const [managerList, setManagerList] = useState<IManager[]>([]);
  const [managerToEdit, setManagerToEdit] = useState<IManager>();
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

  useEffect(() => {
    Manager.GetManager(undefined, Token).then(
      (res) => res && setManagerList([...res])
    );
  }, []);

  return (
    <C.Container>
      <HeaderApp origin="Manager" title="AREA DO ADMINISTRADOR" />
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

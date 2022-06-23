import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import * as C from "./style";
interface Props {
  origin: string;
  title: string;
}
function HeaderApp({ origin, title }: Props) {
  const navigate = useNavigate();
  return (
    <C.Container>
      <Menu origin={origin} />
      <p>{title}</p>
      <button onClick={()=>{navigate("/logs")}}>Ver Logs</button>
      <div className="SpaceMenu"></div>
    </C.Container>
  );
}
export default HeaderApp;

import { useNavigate } from "react-router-dom";
import * as C from "./style";
interface Props {
  origin: string;
}
function Menu({ origin }: Props) {
  const navigate = useNavigate();
  function handleClick() {
    if (origin === "Manager") {
      navigate("/home");
    } else {
      navigate("/manager");
    }
  }
  let ORIGIN = "";
  if (origin === "Manager") ORIGIN = "HOME";
  if (origin === "Home") ORIGIN = "MANAGER";
  return (
    <C.Container>
      <button onClick={handleClick}>{ORIGIN}</button>
    </C.Container>
  );
}
export default Menu;

import * as R from "react";
import Menu from "../Menu";
import * as C from "./style";
interface Props {
  origin: string;
}
function HeaderApp({ origin }: Props) {
  return (
    <C.Container>
      <Menu origin={origin} />
      <p>REGISTRO USUÁRIOS API</p>
      <div className="SpaceMenu"></div>
    </C.Container>
  );
}
export default HeaderApp;

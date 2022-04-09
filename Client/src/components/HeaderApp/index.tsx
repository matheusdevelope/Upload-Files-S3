import Menu from "../Menu";
import * as C from "./style";
interface Props {
  origin: string;
  title: string;
}
function HeaderApp({ origin, title }: Props) {
  return (
    <C.Container>
      <Menu origin={origin} />
      <p>{title}</p>
      <div className="SpaceMenu"></div>
    </C.Container>
  );
}
export default HeaderApp;

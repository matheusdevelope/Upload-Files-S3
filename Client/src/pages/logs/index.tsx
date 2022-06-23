import * as R from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../../context/AuthProvider";
import { GetLogs } from "../../services/LogAPI";
import { ILog } from "../../types/Log";
import * as C from "./style";
function Log() {
  const [logs, setLogs] = R.useState<ILog[]>([]);
  const [take, setTake] = R.useState<number>(30);
  const [page, setPage] = R.useState<number>(0);
  const [count, setCount] = R.useState<number>(0);
  const [search, setSearch] = R.useState<string>('');
  const navigate = useNavigate();
  const Token = R.useContext(UserLogin)?.user?.token || "";
  R.useEffect(() => {
    GetLogs({ take: take, skip: page * take, keyword: search }, Token)
      .then(data => {
        setLogs(data.data)
        setCount(Math.ceil(data.count / take))
      })
      .catch(e => console.error(e))

  }, [take, page, search])

  R.useEffect(() => {
    page + 1 > count && setPage(count - 1)
  }, [take, count])

  return (
    <C.Container>
      <button onClick={() => { navigate("/home") }}><strong>Voltar Para Area Principal</strong></button>
      <div className="logs_div">
        {
          logs.map((obj, key) => (
            <div key={key}>
              <p>
                <strong>{obj.created_at}</strong>
              </p>
              <p>
                <strong>{obj.requester}</strong>
              </p>


              <pre>{JSON.stringify(JSON.parse(obj.data), null, 2)}</pre>
            </div>
          ))
        }

      </div>
      <div className="footer">
        <label htmlFor="AmountLogs" >Quantidade de Resistros:
          <input id="AmountLogs" type="number" value={take} onChange={e => setTake(e.target.valueAsNumber)} />
        </label>
        <label htmlFor="Search" >Procurar conteúdo do erro:
          <input id="Search" type="text" value={search} onChange={e => setSearch(e.target.value)} />
        </label>

        <button onClick={() => { page > 0 && setPage(page - 1) }}>Voltar</button>
        <p>Pagina: {page + 1} de {count}</p>
        <button onClick={() => {
          page + 2 <= count && setPage(page + 1)

        }}>Próxima</button>
      </div>

    </C.Container>
  );
}
export default Log;

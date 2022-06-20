var V=Object.defineProperty,K=Object.defineProperties;var Q=Object.getOwnPropertyDescriptors;var I=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var H=(t,a,e)=>a in t?V(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,x=(t,a)=>{for(var e in a||(a={}))W.call(a,e)&&H(t,e,a[e]);if(I)for(var e of I(a))X.call(a,e)&&H(t,e,a[e]);return t},v=(t,a)=>K(t,Q(a));import{j as T,r as h,N as S,s as f,a as Y,u as O,B as Z,R as ee,b as M,c as te,d as re}from"./vendor.8278c9de.js";const ne=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}};ne();const n=T.exports.jsx,l=T.exports.jsxs,ae=T.exports.Fragment,P=h.exports.createContext(void 0);function oe({children:t}){const[a,e]=h.exports.useState(void 0),s={user:a,setUser:e,HolesManager:{firstAccess:0,readOnly:1,all:2}};return n(P.Provider,{value:s,children:t})}function _({children:t}){var e;const a=h.exports.useContext(P);return(e=a==null?void 0:a.user)!=null&&e.token?a.user.access==0?n(S,{to:"/firstAccess",replace:!0}):n(ae,{children:t}):n(S,{to:"/login",replace:!0})}const se=f.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 8px;
  form {
    margin: 16px;
  }
  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
  }
  input {
    font-size: 18px;
    margin: 4px 0;
  }
  button {
    margin-top: 10px;
    width: 100%;
    height: 30px;
  }
`,F=Y.create({baseURL:"http://localhost:3500",headers:{}}),U="/api/Manager";function $(t){return{headers:{authorization:`Bearer ${t}`}}}async function ie(t){try{return(await F.post("/api/manager/login",t)).data}catch(a){return console.error(a),Promise.reject(a.response)}}async function le(t,a){try{return(await F.get(`${U}${t?"/"+t:""}`,$(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function ce(t,a){try{return(await F.post(`${U}`,t,$(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function de(t,a){try{return(await F.put(`${U+"/"}`+t.id,t,$(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function ue(t,a){try{return(await F.delete(`${U+"/"}`+t.id,$(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}function G(){async function t(s,r){try{return await ce(s,r)}catch(o){return console.error(o),alert("Falha ao adicionar administrador: "+o.data.message),!1}}async function a(s,r){try{return await de(s,r)}catch(o){return console.error(o),alert("Falha ao editar administrador: "+o.data.message),!1}}async function e(s,r){try{return await ue(s,r)}catch(o){return console.error(o),alert("Falha ao deletar administrador: "+o.data.message),!1}}async function i(s,r){try{return await le(s,r)}catch(o){return console.error(o),alert("Falha ao listar administrador: "+o.data.message),!1}}return{AddManager:t,EditManager:a,DeleteManager:e,GetManager:i}}function pe(){var m;const t=h.exports.useContext(P),[a,e]=h.exports.useState(((m=t==null?void 0:t.user)==null?void 0:m.user)||""),[i,s]=h.exports.useState(""),[r,o]=h.exports.useState(""),[c,u]=h.exports.useState(!1),p=G(),y=O();return l(se,{children:[n("h4",{children:"Voc\xEA precisa alterar as credenciais de administrador para prosseguir."}),l("form",{onSubmit:async d=>{var C,E,g;d.preventDefault();const b={id:(C=t==null?void 0:t.user)==null?void 0:C.id,user:a,name:((E=t==null?void 0:t.user)==null?void 0:E.name)||a,pass:i,access:(t==null?void 0:t.HolesManager.all)||0};if(a===""||i==="")return alert("Preencha os Dados!");u(!0);try{const w=await p.EditManager(b,((g=t==null?void 0:t.user)==null?void 0:g.token)||"");w?(t==null||t.setUser(w),y("/login")):alert("Falha ao redefinir credenciais. Detalhes no console.");return}catch(w){u(!1),alert("Falha no login: "+JSON.stringify(w.data.message));return}},children:[l("label",{htmlFor:"user",children:["Usu\xE1rio:",n("input",{autoCorrect:"none",autoFocus:!0,type:"text",name:"user",value:a,onChange:d=>{e(d.target.value)}})]}),l("label",{htmlFor:"pass",children:["Senha:",n("input",{type:"password",name:"pass",value:i,onChange:d=>{s(d.target.value)}})]}),l("label",{htmlFor:"pass",children:["Confirme a Senha:",n("input",{type:"password",name:"pass",value:r,onChange:d=>{o(d.target.value)}})]}),n("button",{disabled:r!==i||i===""||r==="",type:"submit",children:"Entrar"})]}),c&&"Validando..."]})}const he=f.div`
  margin: 5px 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
`;f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;const fe=f.div`
  padding: 4px;
  div {
    display: flex;
  }
  input {
    width: 100%;
  }
  label {
    display: flex;
    flex-direction: column;
  }
  .port {
    margin-left: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 90px;
    input {
      margin-left: 4px;
    }
  }
  .Div2 {
    display: flex;
    flex-direction: column;
    label {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    input {
      margin: auto 4px;
      width: fit-content;
      max-width: 50px;
    }
  }
`,xe=f.button`
  margin: 4px 8px;
`;function me({handleAddFTP:t,handleEditFTP:a,FTPToEdit:e,reset:i}){const s={host:"",user:"",pass:"",port:21,path:"",deleteFiles:!0,order:1},[r,o]=h.exports.useState(s);function c(p){switch(p.target.name){case"host":o(v(x({},r),{host:p.target.value}));return;case"user":o(v(x({},r),{user:p.target.value}));return;case"pass":o(v(x({},r),{pass:p.target.value}));return;case"port":o(v(x({},r),{port:Number(p.target.value)}));return;case"path":o(v(x({},r),{path:p.target.value}));return;case"deleteFiles":o(v(x({},r),{deleteFiles:Boolean(p.target.checked)}));return;case"order":o(v(x({},r),{order:Number(p.target.value)}));return;default:return alert("Field n\xE3o mapeado")}}function u(){if(r.host===""||r.user===""||r.pass===""||r.path==="")return alert("Preencha os dados de Conex\xE3o com FTP!");e?a(r):t(r),o(s)}return h.exports.useEffect(()=>{e&&o(x({},e))},[e]),h.exports.useEffect(()=>{o(x({},s))},[i]),l(he,{children:[l(fe,{children:[l("div",{children:[n("input",{name:"host",value:r.host,onChange:c,placeholder:"Host"}),l("label",{htmlFor:"port",className:"port",children:["Porta:",n("input",{name:"port",type:"number",value:r.port,onChange:c,placeholder:"Porta"})]})]}),l("div",{children:[n("input",{name:"user",value:r.user,onChange:c,placeholder:"Usu\xE1rio"}),n("input",{name:"pass",value:r.pass,onChange:c,placeholder:"Senha"})]}),l("label",{children:["Pasta Padr\xE3o:",n("input",{name:"path",value:r.path,onChange:c})]}),l("div",{className:"Div2",children:[l("label",{className:"labelDeleteFiles",children:[n("input",{name:"deleteFiles",type:"checkbox",checked:r.deleteFiles,onChange:c}),"Deletar Arquivos ap\xF3s uso:"]}),l("label",{children:["Ordem Disponibilidade:",n("input",{name:"order",type:"number",value:r.order,onChange:c})]})]})]}),n(xe,{onClick:u,children:e?"Salvar Altera\xE7\xF5es FTP":"Adicionar FTP"})]})}const ge=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;f.div`
  display: flex;
  width: 100%;
  border-bottom: 1px #000 solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    border-right: #ddd 1px solid;
    padding: 0 8px;
  }
`;const ve=f.div`
  /* display: flex; */
  width: 100%;
  min-height: 30px;
  border-bottom: 1px #ddd solid;
  padding: 4px;
  p,
  input,
  label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto 0;
    flex: 1;
    text-align: start;
    input {
      margin: 0 4px;
    }
  }
  div {
    margin: auto;
    display: flex;
    flex: 1;
  }
  button {
    margin: auto 4px;
    width: 50px;
  }

  .user,
  .pass,
  .port,
  .order {
    margin: auto 4px;
    max-width: 50px;
  }
`;function ye({FTPs:t,handleSendEditFTPToForm:a,handleDeleteFTP:e,handleEditFTP:i,DisableButtons:s}){function r(c,u,p){i(v(x({},u),{deleteFiles:c.target.checked}),p)}function o(c,u){return l(ve,{children:[l("div",{children:[n("p",{className:"host",children:c.host}),n("p",{className:"user",children:c.user}),n("p",{className:"pass",children:c.pass})]}),l("div",{children:[n("p",{className:"path",children:c.path}),n("p",{className:"port",children:c.port}),n("p",{className:"order",children:c.order})]}),l("div",{children:[l("label",{htmlFor:"deleteFiles",children:[n("input",{className:"deleteFiles",disabled:Boolean(s),type:"checkbox",checked:c.deleteFiles,onChange:p=>r(p,c,u)}),"Deletar Arquivos"]}),n("button",{disabled:Boolean(s),onClick:()=>{a(c,u)},children:"Editar"}),n("button",{disabled:Boolean(s),onClick:()=>{e(c,u)},children:"Excluir"})]})]},u)}return n(ge,{children:n("ul",{children:t.map(o)})})}const be=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  border-right: 1px #ddd solid;
  margin: 8px 0;
`,we=f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`;function Fe({FTPList:t,setFTPList:a,reset:e}){const[i,s]=h.exports.useState(),[r,o]=h.exports.useState(0);function c(m){let d=t;d.push(m),a([...d])}function u(m,d){o(d),s(x({},m))}function p(m,d){let b=t;b.splice(d||r,1,m),r>0&&o(0),a([...b]),s(void 0)}function y(m,d){let b=t;b.splice(d,1),a([...b])}return l(be,{children:[n(we,{children:"Conex\xF5es FTP"}),n(ye,{FTPs:t,handleSendEditFTPToForm:u,handleEditFTP:p,handleDeleteFTP:y,DisableButtons:i}),n(me,{handleAddFTP:c,handleEditFTP:p,FTPToEdit:i,reset:e})]})}const Ce=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  border-right: 1px #ddd solid;
`,Ee=f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,Pe=f.div`
  padding: 0 4px;
  label {
    display: flex;
    flex-direction: column;
  }
  .allow_access {
    flex-direction: row;
    align-items: center;
    input {
      margin: auto 4px;
    }
  }

  .label_expiration_files {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4px 0;
    input {
      margin: auto 0;
      max-width: 40px;
    }
  }
`,Ae=f.button`
  height: 30px;
  margin: 8px;
`;function Me({handleAddUser:t,handleEditUser:a,UserToEdit:e}){const i={id:"",name:"",cnpj:"",allow_access:!0,expiration_files:30,ftp:[]},[s,r]=h.exports.useState(i),[o,c]=h.exports.useState(!1);function u(m){switch(m.target.name){case"name":r(v(x({},s),{name:m.target.value}));return;case"cnpj":r(v(x({},s),{cnpj:m.target.value}));return;case"expiration_files":r(v(x({},s),{expiration_files:Number(m.target.value)}));return;case"allow_access":r(v(x({},s),{allow_access:Boolean(m.target.checked)}));return;default:return alert("Field n\xE3o mapeado")}}async function p(){if(s.name===""||s.cnpj==="")return alert("Preencha os dados de Nome e CNPJ!");if(s.expiration_files<5)return alert("O tempo minimo de expira\xE7\xE3o de arquivos \xE9 5 dias!");if(e){if(!await a(s))return}else if(!await t(x({},s)))return;r(x({},i)),c(!o)}function y(m){let d=s;d.ftp=[...m],r(x({},d))}return h.exports.useEffect(()=>{e&&r(x({},e))},[e]),l(Ce,{children:[n(Ee,{children:"Adicionar Novo Usu\xE1rio"}),l(Pe,{children:[l("label",{children:["Nome Empresa:",n("input",{name:"name",value:s.name,onChange:u})]}),l("label",{children:["CNPJ/CPF:",n("input",{name:"cnpj",value:s.cnpj,onChange:u})]}),l("label",{className:"label_expiration_files",children:["Tempo De Expira\xE7\xE3o Arquivos:",n("input",{className:"expiration_files",type:"number",name:"expiration_files",value:s.expiration_files,onChange:u})]}),l("label",{className:"allow_access",children:[n("input",{name:"allow_access",type:"checkbox",checked:s.allow_access,onChange:u}),"Acessar Recursos API:"]})]}),n(Fe,{FTPList:s.ftp,setFTPList:y,reset:o}),n(Ae,{onClick:p,children:e?"Salvar Altera\xE7\xF5es Usu\xE1rio":"Adicionar Usu\xE1rio"})]})}const Ue=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`,$e=f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,Ne=f.div`
  display: flex;
  width: 100%;
  border-bottom: 1px #000 solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    border-right: #ddd 1px solid;
    padding: 0 8px;
  }
`,ke=f.div`
  display: flex;
  width: 100%;
  min-height: 30px;
  border-bottom: 1px #ddd solid;
  p,
  input {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    flex: 1;
    padding: 0 8px;
  }
  div {
    margin: auto;
    display: flex;
    flex: 1;
    padding: 0 8px;
    justify-content: space-around;
  }
`;function je({Users:t,handleSendEditUserToForm:a,handleDeleteUser:e,handleEditUser:i,DisableButtons:s}){function r(c,u){i(v(x({},u),{allow_access:c.target.checked}))}function o(c,u){return l(ke,{children:[n("p",{children:c.name}),n("p",{children:c.cnpj}),n("p",{children:c.expiration_files}),n("input",{type:"checkbox",checked:c.allow_access,onChange:p=>r(p,c)}),l("div",{children:[n("button",{disabled:Boolean(s),onClick:()=>{a(c)},children:"Editar"}),n("button",{disabled:Boolean(s),onClick:()=>{e(c)},children:"Excluir"})]})]},u)}return l(Ue,{children:[n($e,{children:"Usu\xE1rios Registrados"}),l(Ne,{children:[n("p",{children:"Nome"}),n("p",{children:"CNPJ"}),n("p",{children:"Expira\xE7\xE3o Arquivos"}),n("p",{children:"Acessa API"}),n("p",{children:"A\xE7\xE3o"})]}),n("ul",{children:t.map(o)})]})}const Le=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`,Re=f.div`
  display: flex;
  flex: 1;
`,Te=f.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background-color: transparent;
    color: #fff;
  }
`;function Oe({origin:t}){const a=O();function e(){a(t==="Manager"?"/home":"/manager")}let i="";return t==="Manager"&&(i="HOME"),t==="Home"&&(i="MANAGER"),n(Te,{children:n("button",{onClick:e,children:i})})}const De=f.div`
  height: 50px;
  background-color: #21222c;
  display: flex;
  p {
    font-size: 25px;
    color: #f3f3ed;
    margin: auto;
  }
  .SpaceMenu {
    width: 70px;
  }
`;function z({origin:t,title:a}){return l(De,{children:[n(Oe,{origin:t}),n("p",{children:a}),n("div",{className:"SpaceMenu"})]})}const N="/api/user";function k(t){return{headers:{authorization:`Bearer ${t}`}}}async function Ie(t,a){try{return(await F.get(`${N}${t?"/"+t:""}`,k(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function He(t,a){try{return(await F.post(`${N}`,t,k(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function Se(t,a){try{return(await F.put(`${N+"/"}`+t.id,t,k(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function _e(t,a){try{return(await F.delete(`${N+"/"}`+t.id,k(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}function Be(){async function t(s,r){try{return await He(s,r)}catch(o){return console.error(o),alert("Falha ao adicionar usu\xE1rio: "+o.data.message),!1}}async function a(s,r){try{return await Se(s,r)}catch(o){return console.error(o),alert("Falha ao editar usu\xE1rio: "+o.data.message),!1}}async function e(s,r){try{return await _e(s,r)}catch(o){return console.error(o),alert("Falha ao deletar usu\xE1rio: "+o.data.message),!1}}async function i(s,r){try{return await Ie(s,r)}catch(o){return console.error(o),alert("Falha ao listar usu\xE1rios: "+o.data.message),!1}}return{AddUser:t,EditUser:a,DeleteUser:e,GetUser:i}}function Ge(){var y,m;const t=Be(),a=((m=(y=h.exports.useContext(P))==null?void 0:y.user)==null?void 0:m.token)||"",[e,i]=h.exports.useState([]),[s,r]=h.exports.useState();async function o(d){const b=await t.AddUser(d,a);return b?(i(C=>[...C,b]),Promise.resolve(!0)):Promise.resolve(!1)}async function c(d){function b(E){const g=e.findIndex((A,R)=>A.id===E.id);let w=e;w.splice(g,1,E),i([...w])}return await t.EditUser(d,a)?(b(d),r(void 0),Promise.resolve(!0)):Promise.resolve(!1)}function u(d){t.DeleteUser(d,a).then(b=>{b&&i(e.filter(C=>C.id!==d.id))})}function p(d){r(x({},d))}return h.exports.useEffect(()=>{t.GetUser(void 0,a).then(d=>d&&i([...d]))},[]),l(Le,{children:[n(z,{origin:"Home",title:"REGISTRO USU\xC1RIOS API"}),l(Re,{children:[n("div",{children:n(Me,{handleAddUser:o,handleEditUser:c,UserToEdit:s})}),n(je,{Users:e,handleSendEditUserToForm:p,handleEditUser:c,handleDeleteUser:u,DisableButtons:s})]})]})}const ze=f.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  form {
    margin: 50px;
  }
  label {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    font-size: 20px;
  }
  input {
    font-size: 18px;
    margin: 4px 0;
  }
  button {
    margin-top: 10px;
    width: 100%;
    height: 30px;
  }
`;function B(){const[t,a]=h.exports.useState(""),[e,i]=h.exports.useState(""),[s,r]=h.exports.useState(!1),o=h.exports.useContext(P),c=O();return l(ze,{children:[n("h2",{children:"Fa\xE7a o Login"}),l("form",{onSubmit:async u=>{u.preventDefault();const p={user:t,pass:e};if(t===""||e==="")return alert("Preencha os Dados!");r(!0);try{const y=await ie(p);o==null||o.setUser(y),c("/home");return}catch(y){r(!1),alert("Falha no login: "+JSON.stringify(y.data.message));return}},children:[l("label",{htmlFor:"user",children:["Usu\xE1rio",n("input",{autoFocus:!0,type:"text",name:"user",value:t,onChange:u=>{a(u.target.value)}})]}),l("label",{htmlFor:"pass",children:["Senha",n("input",{type:"password",name:"pass",value:e,onChange:u=>{i(u.target.value)}})]}),n("button",{type:"submit",children:"Entrar"})]}),s&&"Validando..."]})}const qe=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`,Je=f.div`
  display: flex;
  flex: 1;
`;f.div`
  margin: 8px 0;
  .HeaderFormFTPDefault {
    display: flex;
  }
`;const Ve=f.div`
  width: 300px;
  border: 1px solid #ddd;
  label {
    display: flex;
    flex-direction: column;
  }
`,Ke=f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,Qe=f.button`
  height: 30px;
  margin: 8px;
`;function We({handleAddManager:t,handleEditManager:a,managerToEdit:e}){const i=h.exports.useContext(P),s={id:void 0,user:"",name:"",access:(i==null?void 0:i.HolesManager.readOnly)||0,pass:""},[r,o]=h.exports.useState(s),[c,u]=h.exports.useState("");function p(d){switch(d.target.name){case"user":o(v(x({},r),{user:d.target.value}));return;case"name":o(v(x({},r),{name:d.target.value}));return;case"pass":o(v(x({},r),{pass:d.target.value}));return;default:return alert("Field n\xE3o mapeado")}}function y(d){o(v(x({},r),{access:Number(d.target.value)}))}async function m(){if(r.user===""||r.name==="")return alert("Preencha os dados de Nome e Usu\xE1rio!");if(e){if(!await a(r))return}else if(!await t(x({},r)))return;o(x({},s)),u("")}return h.exports.useEffect(()=>{e&&o(x({},e))},[e]),l(Ve,{children:[n(Ke,{children:"Adicionar Administrador"}),l("form",{children:[l("label",{htmlFor:"user",children:["Usu\xE1rio:",n("input",{autoCorrect:"none",autoFocus:!0,name:"user",value:r.user,onChange:p})]}),l("label",{htmlFor:"name",children:["Nome:",n("input",{autoCorrect:"none",autoFocus:!0,name:"name",value:r.name,onChange:p})]}),l("label",{htmlFor:"access",children:["Acesso:",l("select",{name:"access",value:r.access,onChange:y,children:[n("option",{value:i==null?void 0:i.HolesManager.readOnly,children:"Apenas Consulta"}),n("option",{value:i==null?void 0:i.HolesManager.firstAccess,children:"Administrador (Exige redefini\xE7\xE3o de senha)"}),n("option",{value:i==null?void 0:i.HolesManager.all,children:"Administrador"})]})]}),l("label",{htmlFor:"pass",children:["Senha:",n("input",{type:"password",name:"pass",value:r.pass,onChange:p})]}),l("label",{htmlFor:"pass",children:["Confirme a Senha:",n("input",{type:"password",name:"pass",value:c,onChange:d=>{u(d.target.value)}})]})]}),n(Qe,{onClick:m,disabled:c!==r.pass||r.pass===""||c==="",children:e?"Salvar Altera\xE7\xF5es Usu\xE1rio":"Adicionar Usu\xE1rio"})]})}const Xe=f.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`,Ye=f.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,Ze=f.div`
  display: flex;
  width: 100%;
  border-bottom: 1px #000 solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    border-right: #ddd 1px solid;
    padding: 0 8px;
  }
`,et=f.div`
  display: flex;
  width: 100%;
  min-height: 30px;
  border-bottom: 1px #ddd solid;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    flex: 1;
    padding: 0 8px;
  }
  div {
    margin: auto;
    display: flex;
    flex: 1;
    padding: 0 8px;
    justify-content: space-around;
  }
  select {
    width: 100%;
  }
`;function tt({Managers:t,handleSendEditManagerToForm:a,handleDeleteManager:e,handleEditManager:i,DisableButtons:s}){const r=h.exports.useContext(P);function o(u,p){i(v(x({},p),{access:Number(u.target.value)}))}function c(u,p){return l(et,{children:[n("p",{children:u.user}),n("p",{children:u.name}),n("div",{className:"SelectArea",children:l("select",{name:"access",defaultValue:u.access,onChange:y=>{o(y,u)},children:[n("option",{value:r==null?void 0:r.HolesManager.readOnly,children:"Apenas Consulta"}),n("option",{value:r==null?void 0:r.HolesManager.firstAccess,children:"Administrador (Exige redefini\xE7\xE3o de senha)"}),n("option",{value:r==null?void 0:r.HolesManager.all,children:"Administrador"})]})}),l("div",{children:[n("button",{disabled:Boolean(s),onClick:()=>{a(u)},children:"Editar"}),n("button",{disabled:Boolean(s),onClick:()=>{e(u)},children:"Excluir"})]})]},p)}return l(Xe,{children:[n(Ye,{children:"Usu\xE1rios Registrados"}),l(Ze,{children:[n("p",{children:"User"}),n("p",{children:"Nome"}),n("p",{children:"Acesso"}),n("p",{children:"A\xE7\xE3o"})]}),n("ul",{children:t.map(c)})]})}const j="/api/ftp";function L(t){return{headers:{authorization:`Bearer ${t}`}}}async function rt(t,a){try{return(await F.get(`${j}${t?"/"+t:""}`,L(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function nt(t,a){try{return(await F.post(`${j}`,t,L(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function at(t,a){try{return(await F.put(`${j+"/"}`+t.id,t,L(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}async function ot(t,a){try{return(await F.delete(`${j+"/"}`+t.id,L(a))).data}catch(e){return console.error(e),Promise.reject(e.response)}}function st(){async function t(s,r){try{return await nt(s,r)}catch(o){return console.error(o),alert("Falha ao adicionar FTP: "+o.data.message),!1}}async function a(s,r){try{return await at(s,r)}catch(o){return console.error(o),alert("Falha ao editar FTP: "+o.data.message),!1}}async function e(s,r){try{return await ot(s,r)}catch(o){return console.error(o),alert("Falha ao deletar FTP: "+o.data.message),!1}}async function i(s,r){try{return await rt(s,r)}catch(o){return console.error(o),alert("Falha ao listar FTP: "+o.data.message),!1}}return{AddFTP:t,EditFTP:a,DeleteFTP:e,GetFTP:i}}function it(){var C,E;const t=G(),a=st(),e=((E=(C=h.exports.useContext(P))==null?void 0:C.user)==null?void 0:E.token)||"",[i,s]=h.exports.useState([]),[r,o]=h.exports.useState(),c={host:"",user:"",pass:"",port:21,path:"",deleteFiles:!0,order:1},[u,p]=h.exports.useState(c);async function y(g){const w=await t.AddManager(g,e);return w?(s(A=>[...A,w]),Promise.resolve(!0)):Promise.resolve(!1)}async function m(g){function w(R){const q=i.findIndex((J,ct)=>J.id===R.id);let D=i;D.splice(q,1,R),s([...D])}return await t.EditManager(g,e)?(w(g),o(void 0),Promise.resolve(!0)):Promise.resolve(!1)}function d(g){t.DeleteManager(g,e).then(w=>{w&&s(i.filter(A=>A.id!==g.id))})}function b(g){o(x({},g))}return h.exports.useEffect(()=>{t.GetManager(void 0,e).then(g=>g&&s([...g])),a.GetFTP(void 0,e).then(g=>g&&p(x({},g[0])))},[]),l(qe,{children:[n(z,{origin:"Manager",title:"AREA DO ADMINISTRADOR"}),n("h4",{children:"Administradores:"}),l(Je,{children:[n("div",{children:n(We,{handleAddManager:y,handleEditManager:m,managerToEdit:r})}),n(tt,{Managers:i,handleSendEditManagerToForm:b,handleEditManager:m,handleDeleteManager:d,DisableButtons:r})]})]})}const lt=()=>n(Z,{children:l(ee,{children:[n(M,{path:"/",element:n(B,{})}),n(M,{path:"/login",element:n(B,{})}),n(M,{path:"/firstAccess",element:n(pe,{})}),n(M,{path:"/home",element:n(_,{children:n(Ge,{})})}),n(M,{path:"/manager",element:n(_,{children:n(it,{})})})]})});te.render(n(re.StrictMode,{children:n(oe,{children:n(lt,{})})}),document.getElementById("root"));

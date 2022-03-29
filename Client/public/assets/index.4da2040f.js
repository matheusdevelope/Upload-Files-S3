var _=Object.defineProperty,L=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var C=Object.getOwnPropertySymbols;var R=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var w=(n,e,o)=>e in n?_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o,h=(n,e)=>{for(var o in e||(e={}))R.call(e,o)&&w(n,o,e[o]);if(C)for(var o of C(e))S.call(e,o)&&w(n,o,e[o]);return n},m=(n,e)=>L(n,N(e));import{j as v,r as u,N as F,s as x,a as k,u as I,B as O,R as D,b as y,c as z,d as $}from"./vendor.3d1d4543.js";const q=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}};q();const r=v.exports.jsx,c=v.exports.jsxs,B=v.exports.Fragment,b=u.exports.createContext(void 0);function H({children:n}){const[e,o]=u.exports.useState(void 0),a={user:e,setUser:o};return r(b.Provider,{value:a,children:n})}function M({children:n}){var o;const e=u.exports.useContext(b);return console.log(e),(o=e==null?void 0:e.user)!=null&&o.logged?r(B,{children:n}):r(F,{to:"/login",replace:!0})}const J=x.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  border-right: 1px #ddd solid;
`,T=x.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,G=x.div`
  label {
    display: flex;
    flex-direction: column;
  }
`,K=x.button``;function V(n){let e=new Date().getTime();return"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".substring(0,Number(n)<5?5:Number(n)).replace(/[xy]/g,function(s){let i=(e+Math.random()*16)%16|0;return e=Math.floor(e/16),(s=="x"?i:i&3|8).toString(16)})}function Q({handleAddUser:n,handleEditUser:e,UserToEdit:o}){const a={id:"",name:"",cnpj:"",allow_access:!0,expiration_files:30},[t,s]=u.exports.useState(a);function i(l){switch(l.target.name){case"name":s(m(h({},t),{name:l.target.value}));return;case"cnpj":s(m(h({},t),{cnpj:l.target.value}));return;case"expiration_files":s(m(h({},t),{expiration_files:Number(l.target.value)}));return;case"allow_access":s(m(h({},t),{allow_access:Boolean(l.target.checked)}));return;default:return alert("Field n\xE3o mapeado")}}function p(){if(t.name===""||t.cnpj==="")return alert("Preencha os dados de Nome e CNPJ!");if(t.expiration_files<5)return alert("O tempo minimo de expira\xE7\xE3o de arquivos \xE9 5 dias!");o?e(t):n(m(h({},t),{id:V(10)})),s(a)}return u.exports.useEffect(()=>{o&&s(h({},o))},[o]),c(J,{children:[r(T,{children:"Adicionar Novo Usu\xE1rio"}),c(G,{children:[c("label",{children:["Nome Empresa:",r("input",{name:"name",value:t.name,onChange:i})]}),c("label",{children:["CNPJ/CPF:",r("input",{name:"cnpj",value:t.cnpj,onChange:i})]}),c("label",{children:["Tempo De Expira\xE7\xE3o Arquivos:",r("input",{name:"expiration_files",value:t.expiration_files,onChange:i})]}),c("label",{children:["Pode Acessar Recursos API:",r("input",{name:"allow_access",type:"checkbox",checked:t.allow_access,onChange:i})]})]}),r(K,{onClick:p,children:o?"Salvar Altera\xE7\xF5es":"Adicionar"})]})}const W=x.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`,X=x.div`
  text-align: center;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
`,Y=x.div`
  display: flex;
  width: 100%;
  border-bottom: 1px #000 solid;
  p {
    flex: 1;
    border-right: #ddd 1px solid;
    padding: 0 8px;
  }
`,Z=x.div`
  display: flex;
  width: 100%;
  height: 30px;
  border-bottom: 1px #ddd solid;
  p,
  input {
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
`;function ee({Users:n,handleSendEditUserToForm:e,handleDeleteUser:o,handleEditUser:a}){function t(i,p){a(m(h({},p),{allow_access:i.target.checked}))}function s(i,p){return c(Z,{children:[r("p",{children:i.name}),r("p",{children:i.cnpj}),r("p",{children:i.expiration_files}),r("input",{type:"checkbox",checked:i.allow_access,onChange:l=>t(l,i)}),c("div",{children:[r("button",{onClick:()=>{e(i)},children:"Editar"}),r("button",{onClick:()=>{o(i)},children:"Excluir"})]})]},p)}return c(W,{children:[r(X,{children:"Usu\xE1rios Registrados"}),c(Y,{children:[r("p",{children:"Nome"}),r("p",{children:"CNPJ"}),r("p",{children:"Expira\xE7\xE3o Arquivos"}),r("p",{children:"Acessa API"}),r("p",{children:"A\xE7\xE3o"})]}),r("ul",{children:n.map(s)})]})}const te=x.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
`,re=x.div`
  display: flex;
  flex: 1;
`,ne=x.div`
  height: 50px;
  background-color: #21222c;
  display: flex;
  p {
    font-size: 25px;
    color: #f3f3ed;
    margin: auto;
  }
`;function oe(){return r(ne,{children:r("p",{children:"REGISTRO USU\xC1RIOS API"})})}const E=k.create({baseURL:"http://localhost:2000"});async function ie(n){try{return(await E.post("/user",n)).data}catch(e){return console.error(e),Promise.reject(e.response.status)}}async function se(n){try{return(await E.post("/user",n)).data}catch(e){return console.error(e),Promise.reject(e.response.status)}}async function ae(n){try{return(await E.post("/user",n)).data}catch(e){return console.error(e),Promise.reject(e.response.status)}}function ce(){async function n(a){try{return await ie(a),!0}catch(t){return console.error(t),alert("Falha ao adicionar usu\xE1rio"),!1}}async function e(a){try{return await se(a),!0}catch(t){return console.error(t),alert("Falha ao adicionar usu\xE1rio"),!1}}async function o(a){try{return await ae(a),!0}catch(t){return console.error(t),alert("Falha ao adicionar usu\xE1rio"),!1}}return{AddUser:n,EditUser:e,DeleteUser:o}}function le(){const[n,e]=u.exports.useState([]),[o,a]=u.exports.useState(),t=ce();function s(d){e(f=>[...f,d])}function i(d){function f(g){const j=n.findIndex((P,pe)=>P.id===g.id);let U=n;U.splice(j,1,g),e([...U])}return f(d)}function p(d){t.DeleteUser(d).then(f=>{f&&e(n.filter(g=>g.id!==d.id))})}function l(d){a(h({},d))}return u.exports.useEffect(()=>{fetch("/api").then(d=>d.json()).then(d=>console.log(d))},[]),c(te,{children:[r(oe,{}),c(re,{children:[r(Q,{handleAddUser:s,handleEditUser:i,UserToEdit:o}),r(ee,{Users:n,handleSendEditUserToForm:l,handleEditUser:i,handleDeleteUser:p})]})]})}async function de(n){return{user:"matheus",pass:"",access:2,logged:!0}}const ue=x.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 100vh;
  form {
    margin: auto;
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
`;function A(){const[n,e]=u.exports.useState(""),[o,a]=u.exports.useState(""),[t,s]=u.exports.useState(!1),i=u.exports.useContext(b),p=I();return c(ue,{children:[c("form",{onSubmit:async l=>{l.preventDefault();const d={user:n,pass:o};if(n===""||o==="")return alert("Preencha os Dados!");s(!0);try{const f=await de(d);i==null||i.setUser(f),p("/home")}catch(f){alert("Erro ao fazer login"+JSON.stringify(f))}s(!1)},children:[c("label",{htmlFor:"user",children:["Usu\xE1rio",r("input",{type:"text",name:"user",value:n,onChange:l=>{e(l.target.value)}})]}),c("label",{htmlFor:"pass",children:["Senha",r("input",{type:"password",name:"pass",value:o,onChange:l=>{a(l.target.value)}})]}),r("button",{type:"submit",children:"Entrar"})]}),t&&"Validando..."]})}const xe=()=>r(O,{children:c(D,{children:[r(y,{path:"/",element:r(A,{})}),r(y,{path:"/login",element:r(A,{})}),r(y,{path:"/home",element:r(M,{children:r(le,{})})})]})});z.render(r($.StrictMode,{children:r(H,{children:r(xe,{})})}),document.getElementById("root"));

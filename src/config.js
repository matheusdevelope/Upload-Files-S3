const keytar = require("keytar");
//require("dotenv/config");
const name = {
  service: process.env.SERVICE_KEYTAR || "xa45eraf5",
  acount: process.env.ACOUNT_KEYTAR || "aso7r4e9",
};
async function GetConfig() {
  try {
    const config = await keytar.getPassword(name.service, name.acount);
    //  Config = JSON.parse(config);
    if (config) return JSON.parse(config);
  } catch (e) {
    return Promise.reject(e);
  }
  return false;
}
async function SetConfig(config) {
  try {
    keytar.setPassword(name.service, name.acount, JSON.stringify(config));
    console.log(
      "O serviço precisa ser fechado e deve ser reaberto para que as alterações tenham efeito.\n\n\n"
    );
    //  setTimeout(process.exit, 3000);
    return;
  } catch (err) {
    return Promise.reject("Erro ao salvar configurações:\n->", err);
  }
}
module.exports = {
  GetConfig,
  SetConfig,
};

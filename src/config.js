//const keytar = require("keytar");
//require("dotenv/config");
const os = require("os");

// const name = {
//   service: process.env.SERVICE_KEYTAR || "xa45eraf5",
//   acount: process.env.ACOUNT_KEYTAR || "aso7r4e9",
// };
async function GetConfig() {
  try {
    const  config   ={
      port_local_server:process.env.PORT_UPLOAD_FILES_S3,
      accessKeyId:process.env.ACESS_KEY_ID_AWS,
      secretAccessKey:process.env.SECRET_KEY_AWS,
      bucket:process.env.BUCKET_S3,
      region:process.env.REGION_BUCKET,
      temp_dir:os.tmpdir()
   }
   console.log(config)
    // const config = await keytar.getPassword(name.service, name.acount);
    //console.log(config);
    //Config = JSON.parse(config);
    if (config) return config //JSON.parse(config);
  } catch (e) {
    return Promise.reject(e);
  }
  return false;
}
async function SetConfig(config) {
  try {
    // keytar.setPassword(name.service, name.acount, JSON.stringify(config));
    // console.log(
    //   "O serviço será fechado e deve ser reaberto para que as alterações tenham efeito.\n\n\n"
    // );
    // setTimeout(process.exit, 3000);
    return;
  } catch (err) {
    return Promise.reject("Erro ao salvar configurações:\n->", err);
  }
}
module.exports = {
  GetConfig,
  SetConfig,
};

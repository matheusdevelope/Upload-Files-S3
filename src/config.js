require("dotenv/config");

const os = require("os");

const ENV = process.env;

async function GetConfig() {
  try {
    const config = {
      port_local_server: ENV.PORT_UPLOAD_FILES_S3,
      accessKeyId: ENV.ACESS_KEY_ID_AWS,
      secretAccessKey: ENV.SECRET_KEY_AWS,
      bucket: ENV.BUCKET_S3,
      region: ENV.REGION_BUCKET,
      temp_dir: os.tmpdir(),
    };
    if (ENV.SHOW_LOG_REQUESTS === "true") console.log(config);
    if (config) return config;
  } catch (e) {
    return Promise.reject(e);
  }
  return false;
}
module.exports = {
  GetConfig,
};

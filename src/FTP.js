//require("dotenv/config");
const ftp = require("basic-ftp");
const { join } = require("path");
const { GetConfig } = require("./config.js");

async function DeleteOnFTP(connection, fileName) {
  const client = new ftp.Client();
  try {
    const config = await GetConfig();
    const pathLocalFile = join(config.temp_dir, fileName);
    const CREDENTIAL_FTP = {
      host: connection.host_ftp,
      user: connection.user_ftp,
      password: connection.pass_ftp,
      secure: false,
    };
    const pathFTPFile = connection.path_of_files + fileName;
    await client.access(CREDENTIAL_FTP);
    const ret = await client.remove(pathFTPFile);
    client.close();
    return ret;
  } catch (err) {
    client.close();
    return Promise.reject(err);
  }
}

async function DownloadoFromFTP(connection, fileName) {
  const client = new ftp.Client();
  try {
    const config = await GetConfig();
    const pathLocalFile = join(config.temp_dir, fileName);
    const CREDENTIAL_FTP = {
      host: connection.host_ftp,
      user: connection.user_ftp,
      password: connection.pass_ftp,
      secure: false,
    };

    let pathFTPFile = connection.path_of_files + fileName;
    pathFTPFile = pathFTPFile.replace(/%20/gm, " ");
    await client.access(CREDENTIAL_FTP);
    await client.downloadTo(pathLocalFile, pathFTPFile);

    client.close();
    return pathLocalFile;
  } catch (err) {
    client.close();
    return Promise.reject(err);
  }
}
module.exports = { DownloadoFromFTP, DeleteOnFTP };

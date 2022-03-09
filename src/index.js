//require("dotenv/config");
const express = require("express");
const cors = require("cors");
const app = express();
const { StartProcess } = require("./AWS_N.js");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res) =>
  res.send("Server is ON, use the [help] endpoint to more details.")
);

app.get("/help", (req, res) =>
  res.send({
    message: "Working, server is online!",
    available_endepoints: {
      up_file_ftp: {
        method: "POST",
        details:
          "Connect to the user FTP and search the files to make them available to public download with a link.",
        expected_body: {
          requester: "your_name",
          files: [
            {
              name: "name-file.zip",
            },
          ],
          ftp: {
            host_ftp: "you_ftp_host.com.br",
            user_ftp: "your_user",
            pass_ftp: "your_pass",
            path_of_files: "/user/your_dir_files/",
            delete_files: "true/false",
          },
          hash_size: 5,
          expiration: 5,
        },
        requite_values: {
          files: [
            {
              name: "The name needs a extension. If you dont provide it will throw a error on request. ",
            },
          ],
          ftp: {
            host_ftp: `Don't put the [ftp://] on init of the host, and dont put the [/] on the final of host.`,
            path_of_files: `Always put the [/] on init and final of the path`,
            delete_files:
              "Thats allow the API to delete the file after the upload success. Default value is [false]",
          },
        },
        optional_properties: {
          hash_size: {
            required: false,
            default_value: 5,
            details:
              "when you not provide the size of hash, it takes the default value 5, thats make the name file unique.",
          },
          expiration: {
            required: false,
            default_value: 5,
            details:
              "This propertie set the value of days that file is available to download, after this time, we delete the file on cloud.",
            details2:
              "The expiration times its always multiple of 5. Example: your send 3, the expiration will be 5, another example: you send 27, the expiration will be 30. We always make a round of the sended value.",
          },
          delete_files: {
            required: false,
            default_value: false,
            details:
              "Thats allow the API to delete the file after the upload success. If we cant delete the file, it will send a propertie [exception] to alert you about the failed on delete.",
          },
        },
        return_values: {
          on_success: {
            message: "Success!",
            data: {
              files: [
                {
                  name: "name-your-file_94e86_5.zip",
                  url: "https://endpoint.com/name-your-file_94e86_5.zip",
                  expiration: 5,
                },
              ],
            },
            exceptions: "none",
          },
          on_error: {
            message: "Error on make something",
            more: "Mode details of the error",
            error: [
              {
                message:
                  "Erro on download file: your_ftp_personal.com.br/user/files/file.zip",
                error: {
                  name: "FTPError",
                  code: 550,
                },
              },
            ],
            common_errors: {
              550: "Requested action not taken. File unavailable (e.g., file not found, no access).",
            },
          },
        },
      },
    },
  })
);
app.post("/up_file_ftp", StartProcess);

module.exports = (port) => {
  app.listen(port || process.env.LOCAL_PORT || 3600, () => {
    console.log(`Server on port ${port || process.env.LOCAL_PORT || 3600}.`);
  });
};

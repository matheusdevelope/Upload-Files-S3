import { NextFunction, Request, Response } from "express";
import { ManagerController } from "./database/controller/ManagerController";
import { UserController } from "./database/controller/UserController";
import { StartProcess } from "./api/aws.js";
const Manager = [
  {
    method: "get",
    route: "/api/manager",
    controller: ManagerController,
    action: "all",
  },
  {
    method: "get",
    route: "/api/manager/:id",
    controller: ManagerController,
    action: "one",
  },
  {
    method: "post",
    route: "/api/manager",
    controller: ManagerController,
    action: "save",
  },
  {
    method: "post",
    route: "/api/manager/login",
    controller: ManagerController,
    action: "login",
  },
  {
    method: "put",
    route: "/api/manager/:id",
    controller: ManagerController,
    action: "update",
  },
  {
    method: "delete",
    route: "/api/manager/:id",
    controller: ManagerController,
    action: "remove",
  },
];
const User = [
  {
    method: "get",
    route: "/api/user",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/api/user/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/api/user",
    controller: UserController,
    action: "save",
  },
  {
    method: "put",
    route: "/api/user/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    route: "/api/user/:id",
    controller: UserController,
    action: "remove",
  },
];

class EntryPoint {
  async entry(request: Request, response: Response, next: NextFunction) {
    return Promise.resolve(
      "Server is ON, use the [help] endpoint to more details."
    );
  }
  async help(request: Request, response: Response, next: NextFunction) {
    return Promise.resolve({
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
            header_message:
              "This allow to add a custom message on top of message generate with the descriptions and links in URI Encode format",
            footer_message:
              "This allow to add a custom message on bottom of message generate with the  descriptions and links in URI Encode format",
          },
          requisited_values: {
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
              default_value: 30,
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
            header_message: {
              required: false,
              defalt_value: "",
              details:
                "to send line breaks in the message you can type ' n' (without space) or '[n]', then we convert to a line break. ",
            },
            footer_message: {
              required: false,
              defalt_value: "",
              details:
                "to send line breaks in the message you can type ' n' (without space) or '[n]', then we convert to a line break. ",
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
                message_encoded_URI:
                  "%%20Test%%20with%%20simbol%%20of%%20%%25%%0A%%0Ahave%%20a%%20line%%20de%%20Break!%%0A%%0A-Name%%20of%%20File%%3A%%0Ahttps%%3A%%2F%%2Fyour-host.com%%2FYour-File.pdf%%0A%%0A",
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
    });
  }
  async up_file_ftp(request: Request, response: Response, next: NextFunction) {
    return StartProcess(request, response);
  }
}

export const Routes = [
  // {
  //   method: "get",
  //   route: "/",
  //   controller: EntryPoint,
  //   action: "entry",
  // },
  {
    method: "get",
    route: "/api/help",
    controller: EntryPoint,
    action: "help",
  },
  {
    method: "post",
    route: "/api/up_file_ftp",
    controller: EntryPoint,
    action: "up_file_ftp",
  },
  ...Manager,
  ...User,
];

import { ManagerController } from "./database/controller/ManagerController";
import { UserController } from "./database/controller/UserController";

const Manager = [
  {
    method: "get",
    route: "/manager",
    controller: ManagerController,
    action: "all",
  },
  {
    method: "get",
    route: "/manager/:id",
    controller: ManagerController,
    action: "one",
  },
  {
    method: "post",
    route: "/manager",
    controller: ManagerController,
    action: "save",
  },
  {
    method: "put",
    route: "/manager/:id",
    controller: ManagerController,
    action: "update",
  },
  {
    method: "delete",
    route: "/manager/:id",
    controller: ManagerController,
    action: "remove",
  },
];
const User = [
  {
    method: "get",
    route: "/user",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/user/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/user",
    controller: UserController,
    action: "save",
  },
  {
    method: "put",
    route: "/user/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    route: "/user/:id",
    controller: UserController,
    action: "remove",
  },
];

export const Routes = [...Manager, ...User];

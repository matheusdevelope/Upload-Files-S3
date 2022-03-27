import { UserController } from "./database/controller/UserController";

const Manager = [
  {
    method: "get",
    route: "/manager",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/manager/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/manager",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/manager/:id",
    controller: UserController,
    action: "remove",
  },
];
const User = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
];

export const Routes = [...Manager, ...User];

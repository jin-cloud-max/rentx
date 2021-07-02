import { Router } from "express";
import multer from "multer";

import upload from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const usersRouter = Router();
const uploadAvatar = multer(upload.upload("./tmp/avatar"));

const createUser = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUser.handle);
usersRouter.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRouter };

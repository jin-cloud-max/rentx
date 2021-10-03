import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const specificationsRouter = Router();

const createSpecification = new CreateSpecificationController();

specificationsRouter.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createSpecification.handle
);

export { specificationsRouter };

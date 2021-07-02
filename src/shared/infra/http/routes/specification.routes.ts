import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const specificationsRouter = Router();

const createSpecification = new CreateSpecificationController();

specificationsRouter.use(ensureAuthenticate);

specificationsRouter.post("/", createSpecification.handle);

export { specificationsRouter };

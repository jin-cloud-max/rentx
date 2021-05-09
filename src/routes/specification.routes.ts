import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRouter = Router();

const createSpecification = new CreateSpecificationController();

specificationsRouter.use(ensureAuthenticate);

specificationsRouter.post("/", createSpecification.handle);

export { specificationsRouter };

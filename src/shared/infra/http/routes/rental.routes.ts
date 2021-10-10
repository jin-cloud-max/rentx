import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticate, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticate,
  devolutionRentalController.handle
);

export { rentalRoutes };

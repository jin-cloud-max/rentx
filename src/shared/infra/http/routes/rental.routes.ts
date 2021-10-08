import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const createRentalController = new CreateRentalController();

const rentalRoutes = Router();

rentalRoutes.post("/", ensureAuthenticate, createRentalController.handle);

export { rentalRoutes };

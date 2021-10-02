import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./car.routes";
import { categoriesRouter } from "./categories.routes";
import { specificationsRouter } from "./specification.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRouter);
router.use("/specifications", specificationsRouter);
router.use("/users", usersRouter);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export { router };

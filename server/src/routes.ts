import { Router } from "express";
import { SearchTestController } from "./controller/SearchTestController";

const router = Router();

//-- ROUTE TEST --
router.get("/test", SearchTestController.handle);

export { router };

import { Router } from "express";
import { SearchTestController } from "./controller/SearchTestController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { CreatedUserController } from "./controller/user/CreatedUserController";

const router = Router();

//-- ROUTE TEST --
router.get("/test", SearchTestController.handle);

//-- ROUTER USER --
router.post("/register", CreatedUserController.handle);
router.post("/auth", AuthUserController.handle);

export { router };

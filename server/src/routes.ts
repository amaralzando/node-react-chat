import { Router } from "express";
import { SearchTestController } from "./controller/SearchTestController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { CreatedUserController } from "./controller/user/CreatedUserController";
import { DetailUserController } from "./controller/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

//-- ROUTE TEST --
router.get("/", SearchTestController.handle);

//-- ROUTER USER --
router.post("/register", new CreatedUserController().handle);
router.post("/auth", new AuthUserController().handle);
router.get("/me", isAuthenticated, new DetailUserController().handle);

export { router };

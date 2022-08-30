import { Request, Response, Router } from "express";

import * as TodoControllers from "../controllers/todoControlle";

const router = Router();

router.get("/todos", TodoControllers.getAllTodo);

router.post("/todo", TodoControllers.createTodo);

router.put("/todo/:id", TodoControllers.updateTodo);

router.delete("/todo/:id", TodoControllers.del);

export default router;

import { Router } from "express";
import TaskController from "../controllers";

const router = Router();

router.route("/").get(TaskController.getAllTasks);
router.route("/:id").get(TaskController.getTaskById);

export default router;
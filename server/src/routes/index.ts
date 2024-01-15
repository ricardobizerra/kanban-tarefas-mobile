import { Router } from "express";
import TaskController from "../controllers";

const router = Router();

router.route("/").get(TaskController.getAllTasks);
router.route("/:id").get(TaskController.getTaskById);
router.route("/").post(TaskController.createTask);

export default router;
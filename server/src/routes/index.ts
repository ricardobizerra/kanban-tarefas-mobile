import { Router } from "express";
import TaskController from "../controllers";

const router = Router();

router.route("/tasks").get(TaskController.getAllTasks);
router.route("/tasks/:id").get(TaskController.getTaskById);

router.route("/tasks").post(TaskController.createTask);

router.route("/tasks/:id").put(TaskController.updateTaskStatus);
router.route("/star-task/:id").put(TaskController.updateTaskStar);

export default router;
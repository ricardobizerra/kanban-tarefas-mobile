import { Request, Response } from "express";
import { prisma } from "../../prisma/db";

class TaskController {
    async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await prisma.task.findMany();

            return res.status(200).json({
                data: tasks,
            })
        } catch (error) {
            return res.status(500).json({
                error,
            })
        }
    }

    async getTaskById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id,
                },
            });

            return res.status(200).json({
                data: task,
            })
        } catch (error) {
            return res.status(500).json({
                error,
            })
        }
    }
}

export default new TaskController();
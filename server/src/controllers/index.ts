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

    async createTask(req: Request, res: Response) {
        const { title, description }: {
            title: string;
            description: string;
        } = req.body;

        try {
            const task = await prisma.task.create({
                data: {
                    title,
                    description,
                },
            });

            return res.status(201).json({
                data: task,
            })
        } catch (error) {
            return res.status(500).json({
                error,
            })
        }
    }

    async updateTaskStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status, concludedAt }: {
            status: "TO_DO" | "IN_PROGRESS" | "DONE";
            concludedAt: Date;
        } = req.body;

        try {
            const task = await prisma.task.update({
                where: {
                    id,
                },
                data: {
                    status,
                    concludedAt
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

    async updateTaskPosition(req: Request, res: Response) {
        const { id } = req.params;
        const { position }: {
            position: number;
        } = req.body;

        try {
            const task = await prisma.task.update({
                where: {
                    id,
                },
                data: {
                    position,
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

    async updateTaskStar(req: Request, res: Response) {
        const { id } = req.params;
        const star = req.body.star as boolean;

        try {
            const task = await prisma.task.update({
                where: {
                    id,
                },
                data: {
                    star,
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
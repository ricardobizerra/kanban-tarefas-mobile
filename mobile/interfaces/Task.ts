interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    star: boolean;
    position: number;
    createdAt: Date;
    updatedAt: Date;
    concludedAt: Date;
}

export default Task;
import { createContext, useContext } from 'react'
import Task from '../interfaces/Task';

interface ITasksContext {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<ITasksContext>({} as ITasksContext)

export const useTasks = () => {
    const context = useContext(TasksContext)

    return context
}
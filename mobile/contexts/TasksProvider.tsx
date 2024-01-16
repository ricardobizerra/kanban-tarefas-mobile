import { ReactNode, useState } from 'react'

import { TasksContext } from './TasksContext'
import Task from '../interfaces/Task'

interface ITasksProviderProps {
    children: ReactNode
}
  
function TasksProvider({ children }: ITasksProviderProps) {

    const [tasks, setTasks] = useState<Task[]>([])

    return (
        <TasksContext.Provider
            value={{
                tasks,
                setTasks,
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider